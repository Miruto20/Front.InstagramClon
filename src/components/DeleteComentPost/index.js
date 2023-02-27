import "./style.css";
import { useTokenContext } from "../../context/TokenContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
// import usePosts from "../../hooks/usePosts";
import { usePostsContext } from "../../context/PostsContext";

const DeleteComentPost = ({ idUser, idComent, setPost, post, idPost }) => {
  const navigate = useNavigate();

  const { token } = useTokenContext();

  return (
    <button
      className="delete"
      //fetch para borrar el post de la BBDD
      onClick={async () => {
        try {
          const res = await fetch(`http://localhost:4000/coments/${idComent}`, {
            method: "DELETE",
            body: JSON.stringify({ idUser, idComent, idPost }),
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          });

          const body = await res.json();
          if (!res.ok) {
            throw new Error(body.message);
          }
          /*           console.log("bodyDeleteComent", body);
           */ setPost(body.data.postComent);

          // console.log("body.data.posts", body.data.posts);
          // setPosts(body.data.posts);
          // navigate("/");
          toast.success(body.message);
        } catch (error) {
          console.error(error);
          toast.error(error.message);
        } finally {
          /*           setShowBorrarComentModal(false);
           */
        }
      }}
    >
      <ion-icon name="trash-outline"></ion-icon>
    </button>
  );
};
// }, [posts]);
// };

export default DeleteComentPost;
