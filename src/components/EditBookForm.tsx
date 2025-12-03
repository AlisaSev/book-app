import React, { useState } from "react";
import { Book } from "../types/index";

function EditBookForm({ book, onSave, onCancel }: { book: Book; onSave: (updatedBook: Book) => void; onCancel: () => void }) {
  // the form field values - initially filled with the data of the book the user is editing
  const [title, setTitle] = useState(book.title);
  const [authors, setAuthors] = useState(book.authors.map(a => a.name).join(", "));
  const [publishedYear, setPublishedYear] = useState(book.published_year || "");
  
  const [description, setDescription] = useState(
    typeof book.description === "string"
      ? book.description
      : (typeof book.description === "object" && book.description 
          ? (book.description as { value: string }).value
          : "")
  );

  // this function is called when the user hits 'Save Changes'
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); 

    // updated book data from the form fields
    const updatedBook: Book = {
      ...book,
      title,
      authors: authors.split(",")
                .map(name => ({ key: name.trim(), name: name.trim() })) 
                .filter(a => a.name), // removing empty author name in case an extra comma was entered
      published_year: publishedYear ? Number(publishedYear) : undefined,
      description: description
    };
    
    onSave(updatedBook); 
  }

  return (
    <div className="p-6 border border-amber-300 rounded-lg bg-amber-50 max-w-lg mx-auto shadow-sm">
      <h2 className="text-center mb-6 text-xl font-bold text-amber-800">EDIT BOOK</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-3 bg-amber-100/50 rounded-lg border border-amber-200">
          <div className="flex items-center mb-2">
            <div className="w-24 font-medium text-amber-700">ID:</div>
            <div className="text-amber-900 font-mono bg-amber-100 px-2 py-1 rounded">{book.id}</div>
          </div>
        </div>
          
        <div>
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-amber-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-amber-50 border border-amber-300 text-amber-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
            required
          />
        </div>
          
        <div>
          <label htmlFor="authors" className="block mb-2 text-sm font-medium text-amber-700">Author</label>
          <input
            type="text"
            id="authors"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            className="bg-amber-50 border border-amber-300 text-amber-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
            placeholder="Author names, comma separated"
          />
          <p className="mt-1 text-xs text-amber-600">Separate multiple authors with commas</p>
        </div>
          
        <div>
          <label htmlFor="published" className="block mb-2 text-sm font-medium text-amber-700">Published Year</label>
          <input
            type="text"
            id="published"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            className="bg-amber-50 border border-amber-300 text-amber-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full p-2.5"
            placeholder="Year of publication"
          />
        </div>
          
        <div>
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-amber-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block p-2.5 w-full text-sm text-amber-900 bg-amber-50 rounded-lg border border-amber-300 focus:ring-amber-500 focus:border-amber-500 min-h-[120px]"
            placeholder="Book description"
          />
        </div>
        
        <div className="flex justify-between pt-2">
          <button 
            type="submit" 
            className="text-white bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          >
            <svg className="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Save Changes
          </button>
          
          <button 
            type="button" 
            onClick={onCancel} 
            className="py-2.5 px-5 text-sm font-medium text-amber-800 focus:outline-none bg-amber-100 rounded-lg border border-amber-300 hover:bg-amber-200 focus:z-10 focus:ring-4 focus:ring-amber-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBookForm;