import { useRouter } from 'next/router';
import fs from 'fs';
import styles from './ProjetSlug.module.scss'; // Importez le module CSS

const ProjectDetails = ({ project }) => {
const router = useRouter();
const { projetSlug } = router.query;

return (
  <main>
    <div className={styles.wrapPage}> {/* Utilisez la classe du module */}
    <div className={styles.informations}> {/* Utilisez la classe du module */}
    <div className={styles.categories}>
{project.categories.map((category, index) => (
  <div key={index} className={styles.category}>{category}</div>
))}
</div>
      <h1>{project.title}</h1>
      <p>{project.timeDate}</p>
      <div dangerouslySetInnerHTML={{ __html: project.websiteUrl }} />
    </div>

    <div className={styles.intro}> {/* Utilisez la classe du module */}
      <div className={styles.top}>
        <div className={`${styles.firstImg} ${styles.image450}`}> {/* Utilisez la classe du module */}
          <img src={project.content.wrapContent.firstImg.src} alt={project.content.wrapContent.firstImg.alt} />
        </div>

        <div className={`${styles.secondImg} ${styles.image450}`}> {/* Utilisez la classe du module */}
          {project.content.wrapContent.secondImg.map((img, index) => (
            <img key={index} src={img.src} alt={img.alt}  />
          ))}
        </div>
      </div>

      <div className={styles.citation}> {/* Utilisez la classe du module */}
        <img className={styles.openQuote} src={`/images/${project.content.wrapContent.citation.openQuote}`} alt="openQuote" />
        <p>{project.content.wrapContent.citation.content}</p>
        <img className={styles.closeQuote} src={`/images/${project.content.wrapContent.citation.closeQuote}`} alt="closeQuote" />
      </div>

      <div className={`${styles.thirdImg} ${styles.image450}`}> {/* Utilisez la classe du module */}
        {project.content.wrapContent.thirdImg.map((img, index) => (
          <img key={index} src={img.src} alt={img.alt} />
        ))}
      </div>

      <div className={styles.firstText}> {/* Utilisez la classe du module */}
        <h3>{project.content.wrapContent.firstText.title}</h3>
        <div dangerouslySetInnerHTML={{ __html: project.content.wrapContent.firstText.content }} />
      </div>

      <div className={styles.fourthImg}> {/* Utilisez la classe du module */}
        {Array.isArray(project.content.wrapContent.fourthImg) ? (
          project.content.wrapContent.fourthImg.map((img, index) => (
            <div key={index}>
              <img src={img.src} alt={img.alt} />
              <p>{img.content}</p>
            </div>
          ))
        ) : (
          <div>
            <img src={project.content.wrapContent.fourthImg.src} alt={project.content.wrapContent.fourthImg.alt} />
            <p>{project.content.wrapContent.fourthImg.content}</p>
          </div>
        )}
      </div>
    </div>

    <div className={styles.contenu}> {/* Utilisez la classe du module */}
      <h2>{project.content.wrapContent.firstH2.title}</h2>
      <img src={project.content.wrapContent.firstH2.src} alt={project.content.wrapContent.firstH2.alt} />

      <h2>{project.content.wrapContent.secondH2.title}</h2>
      <img src={project.content.wrapContent.secondH2.src} alt={project.content.wrapContent.secondH2.alt} />

      <h2>{project.content.wrapContent.thirdH2.title}</h2>
      <img src={project.content.wrapContent.thirdH2.src} alt={project.content.wrapContent.thirdH2.alt} />
    </div>

    

    <div className={styles.btn} dangerouslySetInnerHTML={{ __html: project.behanceUrl }} />
  </div>
  </main>
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
