import { useState } from "react";
import { useTokenContext } from "../context/TokenContext";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const { token } = useTokenContext();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { setToken } = useTokenContext();
  if (token) {
    return <Navigate to="/" />;
  }
  return (
    <section>
      <h2>Pagina de Login</h2>
      <form
        onSubmit={async (event) => {
          try {
            event.preventDefault();

            const res = await fetch("http://localhost:4000/users/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username, email, password }),
            });

            const body = await res.json();

            if (!res.ok) {
              throw new Error(body.message);
            }

            setToken(body.data.token);
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

        <button>Login</button>
      </form>
      {errorMessage && <p>Error: {errorMessage}</p>}
    </section>
  );
};

export default LoginPage;
