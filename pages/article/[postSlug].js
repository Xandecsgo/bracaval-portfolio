import { useRouter } from 'next/router';
import fs from 'fs';
import styles from './PostSlug.module.scss'; // Importez le module CSS
import Head from 'next/head';

const PostDetails = ({ post }) => {
  const router = useRouter();
  const { postSlug } = router.query;

  // Vérification pour s'assurer que 'post' est défini avant d'accéder à ses propriétés
  if (!post) {
    return <p>Post not found</p>;
  }

  <Head>
    <title>Articles de Guillaume Bracaval - Direction artistique digitale, graphisme d'interface et UX design</title>
    <meta name="description" content="Articles du designer Guillaume Bracaval." />
  </Head>

  return (


    <main>
      <div className={styles.wrapPage}> {/* Utilisez la classe du module */}
        <div className={styles.informations}> {/* Utilisez la classe du module */}
          <h1>{post.title}</h1>
          <p>{post.timeDate}</p>
        </div>
      </div>

      <div className={styles.intro}> {/* Utilisez la classe du module */}
        <div className={styles.top}>
          <div className={styles.coverImg}> {/* Utilisez la classe du module */}
            <img src={post.coverImg.src} alt={post.coverImg.alt} />
          </div>
        </div>

        <div className={`${styles.firstText} mb76`}> {/* Utilisez la classe du module */}
          <div dangerouslySetInnerHTML={{ __html: post.content.wrapContent.firstText.content }} />
        </div>
      </div>

      {/* Vous aviez une balise div supplémentaire ici */}
      {/* Suppression de la div en double */}
      <div className={styles.btn} dangerouslySetInnerHTML={{ __html: post.linkedinUrl }} />
    </main>
  );
};

export async function getServerSideProps({ params }) {
  // Chemin vers le fichier databaseArticle.json (à partir de la racine du projet)
  const filePath = './databaseArticle.json';

  try {
    // Lire le contenu du fichier databaseArticle.json
    const jsonData = fs.readFileSync(filePath, 'utf-8');

    // Parser le contenu JSON en un objet JavaScript
    const data = JSON.parse(jsonData);

    // Rechercher le post correspondant au slug dans le tableau 'posts'
    const post = data.posts.find((p) => p.slug === params.postSlug);

    if (!post) {
      return {
        notFound: true,
      };
    }

    // Retournez le post correspondant comme propriété dans votre composant
    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.error('Error reading databaseArticle.json:', error);
    return {
      props: {
        post: null, // Utilisez null pour indiquer que le chargement a échoué
      },
    };
  }
}

export default PostDetails; // Assurez-vous que l'export correspond au nom de votre composant
