import "./style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  return (
    <section>
      <h2>Pagina de registro</h2>
      <form
        className="register"
        onSubmit={async (event) => {
          try {
            event.preventDefault();

            const res = await fetch("http://localhost:4000/users", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username, email, password }),
            });

            const body = await res.json();

            if (!res.ok) {
              throw new Error(body.message);
            }

            navigate("/login");

            console.log(body);
          } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
          }
        }}
      >
        <label htmlFor="username">Nombre de Usuario:</label>
        <input
          id="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        <label htmlFor="password">Contraseña:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <button>Registrarse</button>
      </form>
      {errorMessage && <p>Error: {errorMessage}</p>}
    </section>
  );
};

export default RegisterPage;
