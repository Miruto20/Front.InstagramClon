import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTokenContext } from "../../context/TokenContext";

// Página que recoge el recoverPassCode de los parámetros de la url y hace un fetch al back con la nueva contraseña que meta el usuario en el formulario
const RecoverEmailPage = () => {
  // Recogemos el recoverPassCode de los parámetros de la url
  const { recoverEmailCode } = useParams();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const { setToken } = useTokenContext();

  return (
    <section>
      <h2>Cambio de Email</h2>

      <form
        onSubmit={async (event) => {
          try {
            event.preventDefault();

            const res = await fetch("http://localhost:4000/users/email", {
              method: "PUT",
              body: JSON.stringify({
                recoverEmailCode,
                password,
                email,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            });

            const body = await res.json();

            if (!res.ok) {
              throw new Error(body.message);
            }

            // Si el back no da ningún error, deslogueamos al usuario, le avisamos de que su contraseña ha cambiado y lo redirigimos a login
            setToken("");
            toast.success("email actualizado con éxito!");
            navigate("/login");
          } catch (error) {
            console.error(error);
            toast.error(error.message);
          }
        }}
      >
        <label htmlFor="password">contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <label htmlFor="email">email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        <button>Cambiar Email</button>
      </form>
    </section>
  );
};

export default RecoverEmailPage;
