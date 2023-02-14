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

  const { post, setPost, errorMessage, loading } = usePostsByIdUser(idUser);
  // console.log("post.[0]", post);
  const {
    username,
    avatar,
    role,
    createdAt,
    email,
    id: idUserLogged,
  } = loggedUser;

  // const navigate = useNavigate();

  // Si no hay token, redireccionamos a "/login""
  if (!token) {
    return <Navigate to="/login" />;
  }

  // const posts = [Object.values(post)];
  console.log(" Object.values(post)?", Object.values(post));
  return (
    <section>
      {Object.values(post).length > 0 &&
        post.map((currentPost) => {
          return (
            <>
              <h2>perfil de {currentPost.username}</h2>

              <Post
                id={currentPost.idPost}
                text={currentPost.text}
                image={currentPost.image}
                avatar={currentPost.avatar}
                username={currentPost.username}
                email={email}
                place={currentPost.place}
                idUser={idUser}
                rate={currentPost.rate}
                owner={currentPost.owner}
                createdAt={createdAt}
              />
            </>
          );
        })}
    </section>
  );
};

export default UserPostPage;
