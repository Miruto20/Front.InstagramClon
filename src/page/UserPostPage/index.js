import "./style.css";
import { useTokenContext } from "../../context/TokenContext";
import { Navigate, useParams } from "react-router-dom";
import usePostsByIdUser from "../../hooks/usePostsByIdUser";
import Post from "../../components/Post";

const UserPostPage = () => {
  const { token, loggedUser } = useTokenContext();
  const { idUser } = useParams();

  const {
    post,
    /* setPost,
    errorMessage, */
    usernamePage,
    /* avatarPage,
    setUsernamePage,
    loading,
    idUser: idUserPage */
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
          src={`http://localhost:4000/${avatar}`}
          alt={username}
          className="fotoAvatarPeque"
        />
        {usernamePage}
      </h2>
      {Object.values(post).length > 0 &&
        post.map((currentPost) => {
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
                idUser={idUser}
                rate={currentPost.rate}
                owner={currentPost.owner}
                createdAt={currentPost.createdAt}
              />
            </li>
          );
        })}
    </section>
  );
};

export default UserPostPage;
