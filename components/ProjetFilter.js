// FiltreProjetBar.jsx

import React from 'react';
import styles from '../styles/FiltreProjetBar.module.scss'; // Assurez-vous d'importer les styles

const FiltreProjetBar = ({ categories, selectedCategory, onSelectCategory, isAnimated, isPortfolioSectionVisible }) => {
    const filterBarClasses = [styles['filter-bar']];
    
    if (isAnimated && isPortfolioSectionVisible) {
        filterBarClasses.push(styles.visible);
      }
      
      

  return (
    <div className={styles['filter-bar']}>
      <button
        className={`${styles.button} ${selectedCategory === null ? styles.active : ''}`}
        onClick={() => onSelectCategory(null)}
      >
        Tout
      </button>
      {categories.map((category) => (
        <button
          key={category}
          className={`${styles.button} ${selectedCategory === category ? styles.active : ''}`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default FiltreProjetBar;
