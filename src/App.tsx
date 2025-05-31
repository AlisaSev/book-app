import { BookProvider } from "./contexts/BookContext";
import AddBookForm from "./components/AddBookForm";

function App() {
  return (
    <div className="App">
      <BookProvider>
        <AddBookForm />
      </BookProvider>
    </div>
  );
}

export default App;