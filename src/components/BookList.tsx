import { useState } from "react";
import { useBookContext } from "../contexts/BookContext";
import EditBookForm from "./EditBookForm";
import { Book } from "../types/index";

function BookList() {
  const { books, updateBook } = useBookContext();
  const [editingBookId, setEditingBookId] = useState<string | null>(null);
  const [sortType, setSortType] = useState<string>('added-asc');

  // function to sort the books based on the user's selection in the dropdown
  function getSortedBooks() {
    let sorted = [...books]; 
    const [sortBy, sortOrder] = sortType.split('-');
    
    if (sortBy === 'title') {
      sorted.sort((a, b) => {
        const comparison = a.title.localeCompare(b.title);
        return sortOrder === 'asc' ? comparison : -comparison;
      });
    } 
    else if (sortBy === 'added' && sortOrder === 'desc') {
      sorted.reverse();
    }
    
    return sorted;
  }

  function handleSave(updatedBook: Book) {
    updateBook(updatedBook); 
    setEditingBookId(null); 
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-amber-800">My Book Collection</h2>
      <div className="mb-5 flex items-center">
        <div className="mr-5">
          <label className="text-amber-700">Sort order:</label>
          <select 
            value={sortType} 
            onChange={(e) => setSortType(e.target.value)}
            className="ml-2 p-1 border border-amber-300 rounded-md bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="added-asc">Order added</option>
            <option value="added-desc">Order added (newest first)</option>
            <option value="title-asc">By title ascending</option>
            <option value="title-desc">By title descending</option>
          </select>
        </div>
      </div>

      {books.length === 0 ? (
        <div className="text-center py-8 text-amber-600 bg-amber-50 border border-amber-200 rounded-lg">
          Your book list is empty. Add a book using the form above.
        </div>
      ) : (
        <div className="border border-amber-200 rounded-lg overflow-hidden bg-amber-50 shadow-sm">
          {getSortedBooks().map((book: Book) => (
            <div key={book.id} className="p-5 border-b border-amber-200 last:border-b-0 hover:bg-amber-100/50 transition-colors">
              {editingBookId === book.id ? (
                <EditBookForm
                  book={book}
                  onSave={handleSave}
                  onCancel={() => setEditingBookId(null)}
                />
              ) : (
                // this is the normal display mode for a book item
                <div className="max-w-full bg-amber-50 border border-amber-200 rounded-lg shadow-sm hover:shadow transition-all duration-200">
                  <div className="flex p-4">
                    <div className="mr-4 flex-shrink-0">
                      {book.cover_url ? (
                        <img 
                          src={book.cover_url} 
                          alt={`Cover of ${book.title}`} 
                          className="w-24 h-auto object-cover rounded-lg border border-amber-300 shadow-sm" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100x150?text=No+Cover';
                          }}
                        />
                      ) : (
                        <div className="w-24 h-36 bg-amber-100 flex items-center justify-center rounded-lg border border-amber-300 text-xs text-amber-700 text-center p-2 shadow-sm">
                          No Cover Available
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-grow">
                      <h5 className="mb-2 text-lg font-medium tracking-tight text-amber-900">
                        {book.title} 
                        {book.published_year && `(${book.published_year})`}
                      </h5>
                      
                      <div className="mb-2 text-amber-700 font-medium">
                        {book.authors && book.authors.length > 0 
                          ? book.authors.map(a => a.name).join(', ') 
                          : 'Unknown author'}
                      </div>
                      
                      <div className="mb-3 text-sm text-amber-600 max-h-24 overflow-y-auto">
                        {typeof book.description === 'string' 
                          ? book.description 
                          : (book.description && typeof book.description === 'object' 
                            ? (book.description as { value: string }).value 
                            : 'No description available')}
                      </div>
                      
                      <div>
                        <button 
                          type="button"
                          onClick={() => setEditingBookId(book.id)} 
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-amber-800 bg-amber-100 rounded-lg hover:bg-amber-200 focus:ring-4 focus:outline-none focus:ring-amber-300 transition-colors"
                        >
                          Edit
                          <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList;