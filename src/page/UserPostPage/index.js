import { useState, useRef } from "react";
import { useTokenContext } from "../../context/TokenContext";
import { useNavigate } from "react-router-dom";
import { Navigate, useParams } from "react-router-dom";
import PostList from "../../components/PostList";
import usePostsByIdUser from "../../hooks/usePostsByIdUser";
import Post from "../../components/Post";

const UserPostPage = () => {
  const { token, loggedUser } = useTokenContext();
  const { idUser } = useParams();

  const {
    post,
    setPost,
    errorMessage,
    usernamePage,
    avatarPage,
    setUsernamePage,
    loading,
    idUser: idUserPage,
  } = usePostsByIdUser(idUser);
  console.log("usernamePageFinal", usernamePage);

  //aqui en la linea 16 no conseguimos darle el name del "post" que es un array con objetos que incluyen la la propiedad username con el valor del usuario que en todos los obj es el mismo que es el filtro de la fetch
  // const currentPostUsername = post[0].username;
  // console.log("post[0].username", post[0].username);
  // console.log("post.[0]", post);
  const { username, avatar, role, createdAt, email /* usernamePage */ } =
    loggedUser;
  /*   console.log(usernamePage);

   */
  console.log("avatar", avatar);
  // const navigate = useNavigate();

  // Si no hay token, redireccionamos a "/login""
  if (!token) {
    return <Navigate to="/login" />;
  }

  // const posts = [Object.values(post)];
  console.log(" Object.values(post)?", Object.values(post));
  return (
    <section>
      <h2>
        <img
          src={`http://localhost:4000/${avatar}`}
          alt={username}
          className="fotoAvatarPeque"
        />
        {usernamePage}{" "}
      </h2>
      {Object.values(post).length > 0 &&
        post.map((currentPost) => {
          return (
            <article key={currentPost.idPost}>
              <Post
                id={currentPost.idPost}
                text={currentPost.text}
                image={currentPost.image}
                avatar={currentPost.avatar}
                username={currentPost.username}
                email={currentPost.email}
                place={currentPost.place}
                idUser={idUser}
                rate={currentPost.rate}
                owner={currentPost.owner}
                createdAt={currentPost.createdAt}
              />
            </article>
          );
        })}
    </section>
  );
};

export default UserPostPage;
