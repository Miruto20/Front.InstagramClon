import "./style.css";
import { useTokenContext } from "../../context/TokenContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
// import usePosts from "../../hooks/usePosts";
import { usePostsContext } from "../../context/PostsContext";

const DeletePost = ({ idUser, idPost, setShowBorrarModal }) => {
  const navigate = useNavigate();

  const { token } = useTokenContext();
  // const { posts, setPosts } = usePosts();
  const { posts, setPosts } = usePostsContext();

  // useEffect(() => {
  return (
    <button
      //fetch para solicitar que te envíe un correo con una nueva contraseña
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
          console.log(body);

          if (!res.ok) {
            throw new Error(body.message);
          }
          setPosts((posts) => posts.filter((post) => post.id !== idPost));

          // console.log("body.data.posts", body.data.posts);
          // setPosts(body.data.posts);
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
// }, [posts]);
// };

export default DeletePost;
