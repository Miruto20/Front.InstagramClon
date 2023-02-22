import { Link, useParams } from "react-router-dom";
import Post from "../../components/Post/index";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";
import usePostById from "../../hooks/usePostById";
import { useState } from "react";
import { useTokenContext } from "../../context/TokenContext";

import CommentForm from "../../components/CommentForm/index";

// Página que carga un solo post
const PostPage = () => {
  // Recogemos el id de los params de la url
  const { id } = useParams();

  const { loggedUser } = useTokenContext();

  const {
    username: usernameLogged,
    avatar: avatarLogged,
    id: idLogged,
  } = loggedUser;

  // const [showCommentModal, setShowCommentModal] = useState(false);

  // Llamamos al custom hook useEntryById y le pasamos el id que hemos recogido de los params. Este hook se va a encargar de crear los estados entry, loading y errorMessage y un useEffect que carge los datos de la API después del primer render
  const { post, loading, errorMessage, addVoteToPost } = usePostById(id);

  // Hacemos destructuring del objeto post
  const {
    text,
    image,
    avatar,
    username,
    email,
    place,
    idUser,
    rate,
    owner,
    ratedByMe,
    coments,
    valueRated,
    createdAt,
  } = post;

  return (
    <section>
      <h2>Post page</h2>

      {/* Si hay mensaje de error, pintamos el componente ErrorMessage y un link
      para volver a inicio */}
      {errorMessage && (
        <>
          <ErrorMessage msg={errorMessage} />
          <Link to="/">Volver a inicio</Link>
        </>
      )}
      {loading && <Spinner />}

      {/* Si el objeto post no está vacío, pintamos el componente Post con todos los datos del objeto */}
      {Object.values(post).length > 0 && (
        <>
          <Post
            id={id}
            text={text}
            image={image}
            avatar={avatar}
            username={username}
            email={email}
            place={place}
            idUser={idUser}
            rate={rate}
            owner={owner}
            ratedByMe={ratedByMe}
            valueRated={valueRated}
            createdAt={createdAt}
            addVoteToPost={addVoteToPost}
          />
          <CommentForm idPost={id} idUser={idLogged} coments={coments} />
        </>
      )}
    </section>
  );
};

export default PostPage;
