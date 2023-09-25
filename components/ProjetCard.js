import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/ProjetCard.module.scss'; // Import des styles depuis le module SCSS
import { useRouter } from 'next/router';

const ProjetCard = ({ projet }) => {
  const { categories, slug, title, coverImg, websiteUrl } = projet;

  // Vérifiez si categories existe avant d'appeler join
  const categoriesText = categories ? categories.join('') : '';

  // Séparez les catégories en deux paragraphes s'il y en a deux
  const categoryParagraphs = categories && categories.length >= 2
    ? categories.map((category, index) => (
      <p key={index} className={styles['category-paragraph']}>{category}</p>
    ))
    : <p className={styles['category-paragraph']}>{categoriesText}</p>;

  // Vérifiez si coverImg existe avant d'accéder à ses propriétés
  const imgSrc = coverImg ? coverImg.src : '';
  const imgAlt = coverImg ? coverImg.alt : '';

  // État pour suivre la visibilité de .projet-info
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Écoutez l'événement de scroll pour déterminer si .projet-info doit être visible
    const handleScroll = () => {
      const projetInfo = document.querySelector(`#projet-${slug} .${styles['projet-info']}`);
      if (projetInfo) {
        const boundingBox = projetInfo.getBoundingClientRect();
        setIsVisible(boundingBox.top >= 0 && boundingBox.bottom <= window.innerHeight);
      }
    };

    // Attachez l'écouteur d'événement lors du montage du composant
    window.addEventListener('scroll', handleScroll);

    // Détachez l'écouteur d'événement lors du démontage du composant
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [slug]);

  return (
    <div className={styles['projet-card']} id={`projet-${slug}`}>
      <div>
        <img src={imgSrc} alt={imgAlt} />
        <div className={`${styles.categories} ${isVisible ? styles['visible'] : ''}`}>
          {categoryParagraphs}
        </div>
        <div
          className={`${styles['projet-info']} ${isVisible ? styles['visible'] : ''}`}
        >
          <h3>{title}</h3>
          <a href={`/projet/${slug}`} className={styles['decouvrir-button']}>Découvrir</a>
        </div>
      </div>
    </div>
  );
};

export default ProjetCard;
