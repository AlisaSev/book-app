import { createContext, useState, useContext, ReactNode } from 'react';
import { Book } from '../types'; 

const BookContext = createContext<any>(null);

export const BookProvider = ({ children }: { children: ReactNode }) => {
    const [books, setBooks] = useState<Book[]>([]);
    
    const addBook = (book: Book) => {
        setBooks([...books, book]);
    };
    
    const updateBook = (updatedBook: Book) => {
        const updatedBooks = books.map(book => book.id === updatedBook.id ? updatedBook : book);
        setBooks(updatedBooks);
    };
    
    
    return (
        <BookContext.Provider value={{ books, addBook, updateBook }}>
            {children}
        </BookContext.Provider>
    );
};

export const useBookContext = () => useContext(BookContext);
    