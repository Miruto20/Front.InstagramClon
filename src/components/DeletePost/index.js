import "./style.css";
import { useTokenContext } from "../../context/TokenContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DeletePost = ({
  idUser,
  idPost,
  setShowBorrarModal,
  posts,
  setPosts,
}) => {
  const navigate = useNavigate();

  const { token } = useTokenContext();

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

          // setCambioContraseña(true);
          navigate("/");
          setPosts([...posts]);

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
