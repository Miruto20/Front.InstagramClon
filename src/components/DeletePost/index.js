import "./style.css";
import { useTokenContext } from "../../context/TokenContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { usePostsContext } from "../../context/PostsContext";

const DeletePost = ({ idUser, idPost, setShowBorrarModal }) => {
  const navigate = useNavigate();

  const { token } = useTokenContext();
  const { posts, setPosts } = usePostsContext();

  return (
    <button
      //fetch para borrar el post de la BBDD
      onClick={async () => {
        try {
          const res = await fetch(`http://localhost:4000/posts/${idPost}`, {
            method: "DELETE",
            body: JSON.stringify({ idUser, idPost }),
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          });

          const body = await res.json();

          if (!res.ok) {
            throw new Error(body.message);
          }
          setPosts((posts) => posts.filter((post) => post.id !== idPost));

          navigate("/");
          toast.success(body.message);
        } catch (error) {
          console.error(error);
          toast.error(error.message);
        } finally {
          setShowBorrarModal(false);
        }
      }}
    >
      Borrar Post
    </button>
  );
};

export default DeletePost;
