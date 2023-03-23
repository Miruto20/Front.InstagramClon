import "./style.css";
import { useTokenContext } from "../../context/TokenContext";
import { Navigate, useParams } from "react-router-dom";
import usePostsByIdUser from "../../hooks/usePostsByIdUser";
import Post from "../../components/Post";
import { usePostsContext } from "../../context/PostsContext";

//                 rate={currentPost.rate}esta sería la prop adecuada para pasarle a POSt. pero no quiero que enseñe en el header en esta pagina nunca la estrella
// Ya que desde el back en este caso no llega la ingo de valueRated dado que no le puedo pasar tal y como está configurado el back, la info del logged User...(o si podría con isAuth abriendolo tengo la info del loggeado ademas de idUser que es el que recibe por padParam)

const UserPostPage = () => {
  const { token, loggedUser } = useTokenContext();
  const { idUser } = useParams();
  const { addVoteToPost } = usePostsContext();
  const {
    post,
    /* setPost,
    errorMessage, */
    usernamePage,
    avatarPage /* 
    setUsernamePage,
    loading,
    idUser: idUserPage */,
  } = usePostsByIdUser(idUser);

  const { username, avatar, role, createdAt, email } = loggedUser;

  // Si no hay token, redireccionamos a "/login""
  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <section>
      <h2 className="profileName">
        <img
          src={`http://localhost:4000/${avatarPage}`}
          alt={username}
          className="fotoAvatarPeque"
        />
        {usernamePage}
      </h2>
      {Object.values(post).length > 0 &&
        post.map((currentPost) => {
          console.log("currentPost", currentPost);
          return (
            <li className="userPost" key={currentPost.id}>
              <Post
                id={currentPost.id}
                text={currentPost.text}
                image={currentPost.image}
                avatar={currentPost.avatar}
                username={currentPost.username}
                email={currentPost.email}
                place={currentPost.place}
                ratedByMe={currentPost.ratedByMe}
                idUser={currentPost.idUser}
                rate={currentPost.rate}
                owner={currentPost.owner}
                createdAt={currentPost.createdAt}
                valueRated={currentPost.valueRated}
                addVoteToPost={addVoteToPost}
              />
            </li>
          );
        })}
    </section>
  );
};

export default UserPostPage;
