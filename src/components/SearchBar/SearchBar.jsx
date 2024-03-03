import Readct, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(query);
  };

  return (
    <form className={styles.SearchContainer} onSubmit={handleSubmit}>
      <div className={styles.SearchInputContainer}>
      <button type="submit" className={styles.SearchButton}>
          <FaSearch className={styles.SearchIcon} />
        </button>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          className={styles.SearchInput}
          placeholder="Search images..."
        />
        
      </div>
    </form>
  );
};

export default SearchBar;