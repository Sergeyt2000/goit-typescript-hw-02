import css from './SearchBar.module.css';
import toast, { Toaster } from "react-hot-toast";

export default function SearchBar({ onSubmit, onNewSearch }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const query = event.target.query.value.trim();
    if (!query) {
      toast.error("Please enter a search term.");
      return;
    }
    onSubmit(query);
    onNewSearch();
    event.target.reset();
  };
  return (
    <header className={css.header}>
      <form className={css.searchBar} onSubmit={handleSubmit}>
        <input
          type="text"
          className={css.input}
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 2000,
          }}
        />
      </form>
    </header>
  );
}
