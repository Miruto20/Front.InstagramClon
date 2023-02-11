import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useLocalStorage from "../hooks/useLocalStorage";

export const TokenContext = createContext();

export const CustomTokenContextProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("token", "");
  const [loggedUser, setLoggedUser] = useState({});

  const navigate = useNavigate();

  // useEffect que se ejecuta después del primer render y cada vez que el token cambia
  useEffect(() => {
    // Si el token no existe, cambiamos loggedUser a un objeto vacío y cortamos la función
    if (!token) {
      setLoggedUser({});
      return;
    }

    // Si el token existe, recogemos la información del usuario de la API y metemos los datos en el estado loggedUser
    const fetchUserProfile = async () => {
      try {
        const tokenEncryptedPayload = token.split(".")[1];

        const tokenPayload = JSON.parse(atob(tokenEncryptedPayload));

        const res = await fetch(
          `http://localhost:4000/users/${tokenPayload.id}`,
          {
            headers: { Authorization: token },
          }
        );

        const body = await res.json();

        if (!res.ok) {
          throw new Error(body.message);
        }

        setLoggedUser({ ...body.data.user, id: tokenPayload.id });
      } catch (error) {
        // Si hay algún error cargando los datos del usuario logueado (por ejemplo, porque el token caducó) le lanzamos una alerta de que hubo un error al iniciar sesión, lo deslogueamos y lo redirigimos a login
        console.error(error);
        // toast.error("Hubo un error en el login. Porfavor, inténtalo de nuevo");
        setToken("");
        navigate("/login");
      }
    };

    fetchUserProfile();
  }, [token, navigate, setToken]);

  return (
    <TokenContext.Provider
      value={{ token, setToken, loggedUser, setLoggedUser }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenContext = () => {
  return useContext(TokenContext);
};
