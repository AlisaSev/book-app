import React from "react";
import { useBookContext } from "../contexts/BookContext";
import { Book } from "../types";

const BookList: React.FC = () => {
  const { books } = useBookContext();

  const bookItems = books.map((book: Book) => (
    <li key={book.id} className="mb-4 p-4 border rounded">
      <h3 className="text-xl font-bold">{book.title}</h3>
      <p><strong>Author(s):</strong> {book.authors.map((a) => a.name).join(", ")}</p>
      <p><strong>Published:</strong> {book.published_year || "Unknown"}</p>
      <p className="mt-2 text-sm text-gray-700">
        {book.description || "No description available."}
      </p>
    </li>
  ));

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Book List</h2>
      <ul>{bookItems}</ul>
    </div>
  );
};

export default BookList;
