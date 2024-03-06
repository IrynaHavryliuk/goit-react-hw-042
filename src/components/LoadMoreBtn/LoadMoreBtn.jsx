import PropTypes from 'prop-types';
import styles from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick, children }) => (
  <button className={styles.Button} onClick={onClick}>
    {children}
  </button>
);

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default LoadMoreBtn;