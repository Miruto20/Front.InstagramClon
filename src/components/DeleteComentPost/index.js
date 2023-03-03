import "./style.css";
import { useTokenContext } from "../../context/TokenContext";
import { toast } from "react-toastify";

const DeleteComentPost = ({ idUser, idComent, setPost, post, idPost }) => {
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
          setPost(body.data.postComent);

          toast.success(body.message);
        } catch (error) {
          console.error(error);
          toast.error(error.message);
        } finally {
        }
      }}
    >
      <ion-icon name="trash-outline"></ion-icon>
    </button>
  );
};

export default DeleteComentPost;
