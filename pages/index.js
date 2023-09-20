import Head from 'next/head'
import styles from '@/styles/Home.module.scss'
import Projet from '@/components/projet'


export default function Home() {

  
  return (
    <>
      <Head>
        <title>Portfolio de Guillaume Bracaval - Direction artistique digitale, graphisme d'interface et UX design</title>
        <meta name="description" content="Designer avec expertise en direction artistique digitale, graphisme d'interface et UX design. Compétences en gestion de projet et communication. Maîtrise des logiciels Adobe et Figma." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>

      <section id="about">
        <div className={styles.top}>
          <h1>Directeur artistique,<br />concepteur graphique</h1>
          <span>Fusionnant l'Art et la Fonction pour Répondre aux Besoins Réels</span>
        </div>

        <div className={styles.arrow}>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="31"
        height="48.2"
        fill="var(--black)"
        >
        <path className="cls-2" d="m41.11,57.43L34.23,0l-16.61,2,6.88,57.43,16.61-2Z"/>
        <path className="cls-2" d="m61.8,38.96l-13.16-10.37-27.2,34.74,13.16,10.37,27.2-34.74Z"/>
        <path className="cls-2" d="m44.96,60.5L10.34,33.21,0,46.41l34.63,27.29,10.33-13.2Z"/>
        </svg></div>

        <div className={styles.aboutImg}>
          <img src="https://zupimages.net/up/23/38/rh6h.png" alt="Guillaume Bracaval" />
          <div className={styles.aboutText}>
            <span>Guillaume Bracaval</span>
            <p>Mon objectif est simple : créer des designs qui apportent une réelle valeur aux utilisateurs et à la société. Mon parcours m'a permis d'explorer différentes facettes du design, des projets fonctionnels aux concepts innovants.<br /><br />

Je suis convaincu que le design va au-delà de l'esthétique. C'est une manière de résoudre des problèmes et d'avoir un impact positif.<br /><br /> 

Que puis-je faire pour vous ?</p>
          </div>
        </div>

      </section>

      <div id="portfolio">
        <h2>Portfolio</h2>
        <Projet />
      </div>

      </main>
    </>
  )
}


