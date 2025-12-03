import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Book } from '../types/index';
import { fetchBookDetailsByOLID } from '../services/openLibrary';

interface BookContextType {
  books: Book[];
  addBook: (id: string) => Promise<{ success: boolean; message?: string }>;
  updateBook: (updated: Book) => void;
}

// function to create the BookContext, initially undefined until the user adds a book
const BookContext = createContext<BookContextType | undefined>(undefined);


export function BookProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>(() => {
    // load initial books from local storage 
    const saved = localStorage.getItem('books');
    return saved ? JSON.parse(saved) : [];
  });

  // I use this useEffect to save books to local storage automatically when the list changes
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  // function to add a new book by ID, checking for duplicates
  const addBook = async (id: string) => {
    if (books.some(b => b.id === id)) {
      return { success: false, message: 'book already in collection' };
    }

    try {
      const book = await fetchBookDetailsByOLID(id);
      if (book) {
        setBooks(prev => [...prev, book]);
        return { success: true };
      }
      return { success: false, message: 'book not found' };
    } catch {
      return { success: false, message: 'error fetching book' };
    }
  };

  // function to update an existing book in the collection
  const updateBook = (updated: Book) => {
    setBooks(prev => 
      prev.map(b => b.id === updated.id ? updated : b)
    );
  };

  return (
    <BookContext.Provider value={{ books, addBook, updateBook }}>
      {children}
    </BookContext.Provider>
  );
}

// I made this custom hook so it's easier to use the BookContext in other components
export function useBookContext() {
  const ctx = useContext(BookContext);
  if (!ctx) throw new Error('useBookContext must be used inside BookProvider');
  return ctx;
}