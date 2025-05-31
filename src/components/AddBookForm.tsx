import React, { useState, useContext } from "react";
import { useBookContext } from "../contexts/BookContext";

const AddBookForm: React.FC = () => {
  const [olid, setOlid] = useState(""); // State for the OLID input
  const { addBook } = useBookContext(); // Get addBook from context

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Stop page reload
    if (!olid.trim()) return;

    await addBook(olid); // Add the book using OLID
    setOlid(""); // Clear input
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center mb-4">
      <input
        type="text"
        value={olid}
        onChange={(e) => setOlid(e.target.value)}
        placeholder="Enter Open Library ID (OLID)"
        className="border rounded px-3 py-2 w-64"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Book
      </button>
    </form>
  );
};

export default AddBookForm;
