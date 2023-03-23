import "./style.css";
import { useState, useRef } from "react";
import { useTokenContext } from "../../context/TokenContext";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { usePostsContext } from "../../context/PostsContext";
import { toast } from "react-toastify";

const NewPostPage = () => {
  const [text, SetText] = useState("");
  const [place, SetPlace] = useState("");
  const [errorMessage, SetErrorMessage] = useState("");

  const { setPosts, posts } = usePostsContext();

  const imagesInputRef = useRef();

  const { token } = useTokenContext();

  const navigate = useNavigate();

  // Si no hay token, redireccionamos a "/login""
  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <section>
      <h2> Crea tu nuevo Post</h2>
      <form
        className="newPostForm"
        onSubmit={async (event) => {
          try {
            event.preventDefault();
            const images = imagesInputRef.current.files;

            const formData = new FormData();

            formData.set("text", text);
            formData.set("place", place);

            if (images.length) {
              for (const image of images) {
                formData.set(image.name, image);
              }
            }

            const res = await fetch("http://localhost:4000/posts", {
              method: "POST",
              headers: { Authorization: token },
              body: formData,
            });

            const body = await res.json();

            if (!res.ok) {
              throw new Error(body.message);
            }

            setPosts(body.idPost);
            console.log(body);
            toast.success("Post creado con éxito");

            navigate("/");
            // toast.success(body.message);
          } catch (error) {
            console.error(error);
            SetErrorMessage(error.message);
          }
        }}
      >
        <label htmlFor="text">Descripción</label>
        <input
          id="text"
          required
          value={text}
          onChange={(event) => {
            SetText(event.target.value);
          }}
          maxLength="200"
        ></input>

        <label htmlFor="place">Lugar:</label>
        <input
          id="place"
          required
          maxLength={30}
          value={place}
          onChange={(event) => {
            SetPlace(event.target.value);
          }}
        ></input>

        <label htmlFor="image">Imagen</label>
        <input
          id="image"
          type="file"
          multiple
          required
          accept="image/*"
          ref={imagesInputRef}
        ></input>

        <button>Envía tu publicación</button>
      </form>
    </section>
  );
};

export default NewPostPage;
