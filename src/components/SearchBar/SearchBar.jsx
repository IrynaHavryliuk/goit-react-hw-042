import { FaSearch } from 'react-icons/fa';
import styles from './SearchBar.module.css';

export const SearchBar = ({ onSearch }) => {
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const topic = form.elements.topic.value;
    onSearch(topic);
    form.reset();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles['search-form']}>
        <FaSearch className={styles['search-icon']} />
        <input type="text" name="topic" placeholder="Search images and photos" />
      </form>
    </div>
  );
};

export default SearchBar;
