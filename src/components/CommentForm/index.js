import "./style.css";
import { useState } from "react";
import { useTokenContext } from "../../context/TokenContext";
import { usePostsContext } from "../../context/PostsContext";
import { Link } from "react-router-dom";
import PostPhoto from "../PostPhoto";
import DeleteComentPost from "../DeleteComentPost";

const CommentForm = ({ idPost, idUser, coments, setPost, post }) => {
  const [text, setText] = useState("");
  const { token, loggedUser } = useTokenContext();
  const { setPosts, posts, addComentToPost } = usePostsContext();

  const { username: usernameLogged, avatar: avatarLogged } = loggedUser;

  return (
    <section className="comentForm">
      <ul className="ComentList">
        {coments.map((coment) => {
          const {
            avatar: avatarComent,
            id: idComent,
            username: usernameComent,
            text: textComent,
            idUser: idUserComent,
          } = coment;

          return (
            <li className="comentario" key={idComent}>
              <PostPhoto
                image={avatarComent}
                username={usernameComent}
                claseAvatar="fotoAvatarComent"
              />
              <Link to={`/posts/${idUserComent}`}>
                <h4>{usernameComent}</h4>
              </Link>
              <p className="textComent">{textComent}</p>
              <DeleteComentPost
                idUser={idUser}
                idComent={idComent}
                setPost={setPost}
                post={post}
                idPost={idPost}
              />
            </li>
          );
        })}
      </ul>

      <form
        onSubmit={async (e) => {
          try {
            e.preventDefault();

            const res = await fetch(
              `http://localhost:4000/posts/${idPost}/coments`,
              {
                method: "POST",
                headers: {
                  Authorization: token,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ text, idUser, idPost }),
              }
            );

            const body = await res.json();

            if (!res.ok) {
              throw new Error(body.message);
            }

            setPost(body.data.postComent);
            setText("");
          } catch (error) {
            console.error(error);
          } finally {
          }
        }}
      >
        <label htmlFor="text">
          Deja un comentario
          {/* (más adelante ternario con post.comets<0 "se el primero") */}:
        </label>
        <input
          id="text"
          type="text"
          value={text}
          required
          onChange={(event) => {
            setText(event.target.value);
          }}
        />

        <button>Enviar</button>
      </form>
    </section>
  );
};

export default CommentForm;
