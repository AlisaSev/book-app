import { BookProvider } from "./contexts/BookContext";
import AddBookForm from "./components/AddBookForm";
import BookList from "./components/BookList";

function App() {
  return (
    <div className="bg-amber-50 min-h-screen">
      <header className="bg-amber-800 px-4 py-5 mb-8 shadow-md text-center">
        <h1 className="text-2xl font-bold text-white">📚 BOOK MANAGER</h1>
      </header>
      <div className="max-w-3xl mx-auto p-5">
        <BookProvider>
          <div className="mb-8">
            <AddBookForm />
          </div>
          <BookList />
        </BookProvider>
      </div>
      <footer className="bg-amber-800 text-amber-200 py-6 mt-12">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <p className="text-sm">Made by Alisa S. for Xtivia using React, Tailwind CSS, and Flowbite 😻</p>
        </div>
      </footer>
    </div>
  );
}

export default App;