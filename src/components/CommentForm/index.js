import { useState } from "react";
import { useTokenContext } from "../../context/TokenContext";
import { usePostsContext } from "../../context/PostsContext";
import { Link } from "react-router-dom";
import PostPhoto from "../PostPhoto";

//para renderizarlo tras crearlo  PROBAR ESTOOO
//necesito ahora setPosts y Posts, primero filter para buscar el post, luego le añado la info para que lo pinte y set para que renderice

const CommentForm = ({ idPost, idUser, coments }) => {
  const [text, setText] = useState("");
  const { token, loggedUser } = useTokenContext();
  const { setPosts, posts } = usePostsContext();

  const { username: usernameLogged, avatar: avatarLogged } = loggedUser;
  // console.log("posts", posts);

  // const addComentToPost = ({ id, idUser, text, username, avatar }) => {
  //   const index = posts.findIndex((post) => post.id === id);
  //   console.log("index", index);
  //   posts[index].text = text;
  //   posts[index].idUser = idUser;

  //   posts[index].username = username;
  //   posts[index].avatar = avatar;
  //   setPosts([...posts]);
  // };

  /*   const addComentToPost = ({ id, idUser, text, username, avatar }) => {
    return posts.map((post) => {
      if (post.id === id) {
        console.log("id", id);
        return {
          ...post,
          coments: [
            ...post.coments,
            {
              id: post.coments.length + 1,
              idUser,
              text,
              username,
              avatar,
            },
          ],
        };
      } else {
        return post;
      }
    });
  }; */

  return (
    <section>
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
            <li key={idComent}>
              <PostPhoto image={avatarComent} username={usernameComent} />
              <Link to={`/posts/${idUserComent}`}>
                <h4>{usernameComent}</h4>
              </Link>
              <p>{textComent}</p>
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
            /*    const updatedPosts = addComentToPost({
              id: idPost,
              idUser: idUser,
              text: text,
              username: usernameLogged,
              avatar: avatarLogged,
            });
            setPosts(updatedPosts); */
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
