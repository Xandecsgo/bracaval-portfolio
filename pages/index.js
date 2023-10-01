import React, { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import ProjetCard from '../components/ProjetCard';
import data from '../databaseProjet.json';
import ProjetFilter from '../components/ProjetFilter';
import styles from '@/styles/Home.module.scss';
import ProcessusSlider from '../components/ProcessusSlider';
import ArticleCard from '../components/ArticleCard';
import databaseArticle from '../databaseArticle'; 


export default function Home() {

  const articles = databaseArticle.posts;


  const [projets, setProjets] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isPortfolioSectionVisible, setIsPortfolioSectionVisible] = useState(false);
  const [isProcessusSectionVisible, setIsProcessusSectionVisible] = useState(false);

  const portfolioRef = useRef(null);
  const processusRef = useRef(null);

  useEffect(() => {
    setProjets(data.projets);
  }, []);

  const categoriesArray = getUniqueCategories(projets);

  function getUniqueCategories(projets) {
    const categoriesSet = new Set();
    projets.forEach((projet) => {
      if (projet.categories) {
        projet.categories.forEach((category) => {
          categoriesSet.add(category);
        });
      }
    });
    return Array.from(categoriesSet);
  }

  const filterProjetsByCategory = () => {
    if (!selectedCategory) {
      return projets;
    }

    return projets.filter((projet) =>
      projet.categories && projet.categories.includes(selectedCategory)
    );
  };

  useEffect(() => {
    const checkSectionVisibility = () => {
      if (portfolioRef.current && processusRef.current) {
        const portfolioRect = portfolioRef.current.getBoundingClientRect();
        const processusRect = processusRef.current.getBoundingClientRect();

        setIsPortfolioSectionVisible(portfolioRect.top < window.innerHeight);
        setIsProcessusSectionVisible(processusRect.top < window.innerHeight);
      }
    };

    window.addEventListener("scroll", checkSectionVisibility);
    checkSectionVisibility();

    return () => {
      window.removeEventListener("scroll", checkSectionVisibility);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Site internet de Guillaume Bracaval - Direction artistique digitale, graphisme d'interface et UX design</title>
        <meta name="description" content="Designer avec expertise en direction artistique digitale, graphisme d'interface et UX design. Compétences en gestion de projet et communication. Maîtrise des logiciels Adobe et Figma." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.mainContainer}>
        <section className="mb76" id={styles.about}>
          <div className={`${styles.top} mb76`}>
            <h1>Directeur artistique,<br />concepteur graphique</h1>
            <p>Fusionnant l'Art et la Fonction pour Répondre aux Besoins Réels</p>
          </div>

          <div className={`${styles.arrow} mb76`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="31"
              height="48.2"
              fill="var(--black)"
            >
              <path className="cls-2" d="m41.11,57.43L34.23,0l-16.61,2,6.88,57.43,16.61-2Z" />
              <path className="cls-2" d="m61.8,38.96l-13.16-10.37-27.2,34.74 13.16,10.37 27.2-34.74Z" />
              <path className="cls-2" d="m44.96,60.5L10.34,33.21,0,46.41l34.63,27.29,10.33-13.2Z" />
            </svg>
          </div>

          <div className={styles.aboutImg}>
            <img src="https://zupimages.net/up/23/39/f212.png" alt="Guillaume Bracaval" />
            <div className={styles.aboutText}>
              <p className={styles.bg}>Guillaume Bracaval</p>
              <p className="mb23">
                Mon objectif est simple : créer des designs qui apportent une réelle valeur aux utilisateurs et à la société. Mon parcours m'a permis d'explorer différentes facettes du design, des projets fonctionnels aux concepts innovants.
                <br /><br />
                Je suis convaincu que le design va au-delà de l'esthétique. C'est une manière de résoudre des problèmes et d'avoir un impact positif.
                <br /><br />
                Que puis-je faire pour vous ?
              </p>
              <a href="">Faites-le moi savoir !</a>
            </div>
          </div>
        </section>

        <section className={styles.portfolio}>
          <h2 className="mb76">Portfolio</h2>

          {isPortfolioSectionVisible && !isProcessusSectionVisible && (
            <ProjetFilter 
              categories={categoriesArray}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              isAnimated={true}
              isPortfolioSectionVisible={isPortfolioSectionVisible}
            />
          )}

          <div ref={portfolioRef} className="mb23">
            {filterProjetsByCategory().map((projet) => (
              <ProjetCard key={projet.slug} projet={projet} />
            ))}
          </div>
        </section>

        <section className={styles.processus}>
          <h2 className="mb76">Processus de conception</h2>

          <div ref={processusRef} className="mb76">
            <ProcessusSlider
    slides={[
      {
        title: 'Exploration et Compréhension',
        description: 'Livraison du design en accord avec la philosophie des besoins culturels, sociaux et environnementaux.',
        imageSrc: '../images/exploration.svg',
      },
      {
        title: 'Étape 2',
        description: 'Description de l\'étape 2',
        imageSrc: '/chemin/vers/image2.jpg',
      },
       {
        title: 'Étape 3',
        description: 'Description de l\'étape 2',
        imageSrc: '/chemin/vers/image2.jpg',
      },
      // Ajoutez d'autres diapositives de la même manière
    ]}
  />
          </div>
        </section>

        <section className={styles.portfolio}>
          <h2 className="mb76">Blog</h2>
          <div className={styles.articleContainer}>
        {articles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>
          <div>

          </div>
        </section>
        
      </main>
    </>
  );
}
