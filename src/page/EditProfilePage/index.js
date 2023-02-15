import "./style.css";
import { useTokenContext } from "../../context/TokenContext";
import Avatar from "../../components/Avatar";
import getTimeAgo from "../../utils/getTimeAgo";
import { useState, useRef } from "react";
import Modal from "../../components/Modal/index";
import { toast } from "react-toastify";
import { useNavigate, Navigate } from "react-router-dom";
import PassButton from "../../components/PassButton/index";
import EmailButton from "../../components/EmailButton";
const EditProfilePage = () => {
  const { loggedUser } = useTokenContext();
  const { username, createdAt, email } = loggedUser;
  const navigate = useNavigate();
  const [errorMessage, SetErrorMessage] = useState("");

  const imagesInputRef = useRef();

  const [showModal, setShowModal] = useState(false);
  const [showMailModal, setShowMailModal] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  // const [cambioContraseña, setCambioContraseña] = useState(false);
  const { token } = useTokenContext();
  if (!token) {
    return <Navigate to="/login" />;
  }

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
          <label htmlFor="image">Seleccionar imagen</label>
          <input
            id="image"
            type="file"
            required
            accept="image/*"
            ref={imagesInputRef}
          ></input>
          <button>Confirmar cambio</button>
        </form>
        <h3>Nombre de Usuario:{username}</h3>
        <h4>email: {email}</h4>
        <button
          onClick={() => {
            setShowMailModal(true);
          }}
        >
          Cambiar Email
        </button>
        {showMailModal && (
          <Modal setShowModal={setShowMailModal}>
            <p>
              ¿Estás seguro de qué quieres modificarlo? Una vez hagas esto, se
              te desactivará la cuenta hasta que confirmes en tu nuevo mail. Se
              te va a enviar un correo con un código de activacion para cambiar
              el Email. En caso de algun problema contacte con soporte. Un
              cordial saludo.
            </p>
            <label htmlFor="newEmail" />
            <input
              id="newEmail"
              type="email"
              required
              value={newEmail}
              onChange={(event) => {
                setNewEmail(event.target.value);
              }}
            />
            <button
              onClick={() => {
                setShowMailModal(false);
              }}
            >
              Cancelar
            </button>
            <EmailButton
              email={email}
              setShowMailModal={setShowMailModal}
              newEmail={newEmail}
            />
          </Modal>
        )}

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
          <PassButton email={email} setShowModal={setShowModal} />
        </Modal>
      )}
    </section>
  );
};

export default EditProfilePage;
