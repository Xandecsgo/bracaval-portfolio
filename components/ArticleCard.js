import React from 'react';
import styles from '../styles/ArticleCard.module.scss'; // Import des styles depuis le module SCSS

const ArticleCard = ({ article }) => {
  return (
    <div className={styles.article}>
      <img src={article.coverImg.src} alt={article.coverImg.alt} />
      <h3>{article.title}</h3>
      <p>{article.timeDate}</p>
      <a href={`/article/${article.slug}`}>Lire l'article</a>

    </div>
  );
};

export default ArticleCard;
