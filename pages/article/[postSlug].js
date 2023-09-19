import { useRouter } from 'next/router';
import fs from 'fs';

const PostDetails = ({ post }) => {
  const router = useRouter();
  const { postSlug } = router.query;

  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
};

export async function getServerSideProps({ params }) {
  // Chemin vers le fichier database.json (à partir de la racine du projet)
  const filePath = './databaseArticle.json';

  try {
    // Lire le contenu du fichier database.json
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
        post: {}, // En cas d'erreur, retournez un objet vide ou une valeur par défaut
      },
    };
  }
}

export default PostDetails;
