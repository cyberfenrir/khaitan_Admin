import 'react';
import styles from './logo.module.css';

function Logo() {
  return (
    <a href="/" className={styles.logoLink}>
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/d108dad5572bdc79c9e276bbf823e6d213fc41eb8ef37e928546336290771bc4?apiKey=5dee21b4f50742c9b5c16494a624cb30&" alt="Company Logo" className={styles.logoImage} />
    </a>
  );
}

export default Logo;