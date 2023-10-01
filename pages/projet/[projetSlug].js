import { useRouter } from 'next/router';
import fs from 'fs';
import styles from './ProjetSlug.module.scss'; // Importez le module CSS
import Head from 'next/head';

const ProjectDetails = ({ project }) => {
  const router = useRouter();
  const { projetSlug } = router.query;

  return (
    <>
      <Head>
        <title>Portfolio de Guillaume Bracaval - Direction artistique digitale, graphisme d'interface et UX design</title>
        <meta name="description" content="Designer avec expertise en direction artistique digitale, graphisme d'interface et UX design. Compétences en gestion de projet et communication. Maîtrise des logiciels Adobe et Figma." />
      </Head>

      <main>
        <div className={styles.wrapPage}>
          <div className={styles.informations}>
            <div className={styles.categories}>
              {project.categories &&
                project.categories.map((category, index) => (
                  <div key={index} className={styles.category}>
                    {category}
                  </div>
                ))}
            </div>
            <h1>{project.title}</h1>
            <p>{project.timeDate}</p>
            <div dangerouslySetInnerHTML={{ __html: project.websiteUrl }} />
          </div>

          <div className={styles.intro}>
            <div className={styles.top}>
              <div className={`${styles.firstImg}`}>
                <img src={project.coverImg.src} alt={project.coverImg.alt} />
              </div>

              <div className={`${styles.secondImg} mb76`}>
                {project.content.wrapContent.secondImg.map((img, index) => (
                  <img key={index} src={img.src} alt={img.alt} />
                ))}
              </div>
            </div>

            <div className={`${styles.citation} mb76`}>
              <img className={styles.openQuote} src={`/images/${project.content.wrapContent.citation.openQuote}`} alt="openQuote" />
              <p>{project.content.wrapContent.citation.content}</p>
              <img className={styles.closeQuote} src={`/images/${project.content.wrapContent.citation.closeQuote}`} alt="closeQuote" />
            </div>

            <div className={`${styles.thirdImg} mb76`}>
              {project.content.wrapContent.thirdImg.map((img, index) => (
                <img key={index} src={img.src} alt={img.alt} />
              ))}
            </div>

            <div className={`${styles.firstText} mb76`}>
              <h3>{project.content.wrapContent.firstText.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: project.content.wrapContent.firstText.content }} />
            </div>

            {project.content && project.content.wrapContent && project.content.wrapContent.fourthImg && (
              Array.isArray(project.content.wrapContent.fourthImg) ? (
                project.content.wrapContent.fourthImg.length > 0 ? (
                  <div className={styles.fourthImg}>
                    {project.content.wrapContent.fourthImg.map((img, index) => (
                      <div key={index}>
                        {img.src && <img src={img.src} alt={img.alt} />}
                        {img.content && <p>{img.content}</p>}
                      </div>
                    ))}
                  </div>
                ) : null
              ) : (
                (project.content.wrapContent.fourthImg.src || project.content.wrapContent.fourthImg.content) && (
                  <div className={styles.fourthImg}>
                    {project.content.wrapContent.fourthImg.src && <img src={project.content.wrapContent.fourthImg.src} alt={project.content.wrapContent.fourthImg.alt} />}
                    {project.content.wrapContent.fourthImg.content && <p>{project.content.wrapContent.fourthImg.content}</p>}
                  </div>
                )
              )
            )}

            {project.content && project.content.wrapContent &&
              (project.content.wrapContent.firstH2.title ||
                project.content.wrapContent.secondH2.title ||
                project.content.wrapContent.thirdH2.title) && (
                  <div className={styles.contenu}>
                    <h2>{project.content.wrapContent.firstH2.title}</h2>
                    <img src={project.content.wrapContent.firstH2.src} alt={project.content.wrapContent.firstH2.alt} />

                    <h2>{project.content.wrapContent.secondH2.title}</h2>
                    <img src={project.content.wrapContent.secondH2.src} alt={project.content.wrapContent.secondH2.alt} />

                    <h2>{project.content.wrapContent.thirdH2.title}</h2>
                    <img src={project.content.wrapContent.thirdH2.src} alt={project.content.wrapContent.thirdH2.alt} />
                  </div>
                )
            }

            <div className={styles.btn} dangerouslySetInnerHTML={{ __html: project.behanceUrl }} />
          </div>
        </div>
      </main>
    </>
  );
};

// Le reste du code reste inchangé

export async function getServerSideProps({ params }) {
// Chemin vers le fichier databaseProjet.json (à partir de la racine du projet)
const filePath = './databaseProjet.json';

try {
  // Lire le contenu du fichier databaseProjet.json
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  
  // Parser le contenu JSON en un objet JavaScript
  const data = JSON.parse(jsonData);

  // Rechercher le projet correspondant au slug dans le tableau 'projets'
  const project = data.projets.find((p) => p.slug === params.projetSlug);
  
  if (!project) {
    return {
      notFound: true,
    };
  }

  // Retournez le projet correspondant comme propriété dans votre composant
  return {
    props: {
      project,
    },
  };
} catch (error) {
  console.error('Error reading databaseProjet.json:', error);
  return {
    props: {
      project: {}, // En cas d'erreur, retournez un objet vide ou une valeur par défaut
    },
  };
}
}

export default ProjectDetails;
