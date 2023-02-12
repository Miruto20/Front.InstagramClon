import { useTokenContext } from "../context/TokenContext";
import Avatar from "../components/Avatar";
import getTimeAgo from "../utils/getTimeAgo";
import { useState, useRef } from "react";
import Modal from "../components/Modal/index";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const { loggedUser } = useTokenContext();
  const { username, createdAt, email } = loggedUser;
  const navigate = useNavigate();
  const [errorMessage, SetErrorMessage] = useState("");

  const imagesInputRef = useRef();

  const [showModal, setShowModal] = useState(false);
  // const [cambioContraseña, setCambioContraseña] = useState(false);
  const { token } = useTokenContext();

  return (
    <section>
      <h2> Profile </h2>
      <article>
        <Avatar />
        <form
          onSubmit={async (event) => {
            try {
              event.preventDefault();
              const imagenAvatar = imagesInputRef.current.files[0];
              console.log(imagenAvatar);

              const formData = new FormData();
              formData.set("avatar", imagenAvatar);

              /*  Cuando hacemos una entrada le pasamos imagesInputRef.Current.files ...puede contener varias fotos arrai, pero aqui le pasamos la primera posicion SIEMPRE no un array 
              if (imagenAvatar.length) {
                for (const image of imagenAvatar) {
                  formData.set("avatar", image);
                }

              } */
              const res = await fetch("http://localhost:4000/users/avatar", {
                method: "PUT",
                headers: { Authorization: token },
                body: formData,
              });
              console.log(res);
              const body = await res.json();
              console.log(body);

              if (!res.ok) {
                throw new Error(body.message);
              }
              navigate("/");
            } catch (error) {
              console.error(error);
              SetErrorMessage(error.message);
            }
          }}
        >
          <label htmlFor="image">Imagen</label>
          <input
            id="image"
            type="file"
            required
            accept="image/*"
            ref={imagesInputRef}
          ></input>
          <button>Cambiar Foto</button>
        </form>
        <h3>Nombre de Usuario:{username}</h3>
        <h4>email: {email}</h4>
        <p> se unió: {getTimeAgo(new Date(createdAt))}</p>
        <button
          onClick={() => {
            setShowModal(true);
          }}
        >
          Cambiar contraseña
        </button>
      </article>
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <p>
            Se te va a enviar un email con un código para cambiar la contraseña.
            ¿Estás seguro de qué quieres modificarla?
          </p>

          <button
            onClick={() => {
              setShowModal(false);
            }}
          >
            Cancelar
          </button>

          <button
            //fetch para solicitar que te envíe un correo con una nueva contraseña
            onClick={async () => {
              try {
                const res = await fetch(
                  "http://localhost:4000/users/password/recover",
                  {
                    method: "POST",
                    body: JSON.stringify({ email }),
                    headers: { "Content-Type": "application/json" },
                  }
                );

                const body = await res.json();
                console.log(body);

                if (!res.ok) {
                  throw new Error(body.message);
                }

                // setCambioContraseña(true);
                navigate("/login");

                toast.success(body.message);
              } catch (error) {
                console.error(error);
                toast.error(error.message);
              } finally {
                setShowModal(false);
              }
            }}
          >
            Sí, cambiar contraseña
          </button>
        </Modal>
      )}{" "}
    </section>
  );
};

export default EditProfilePage;
