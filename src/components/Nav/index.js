import { NavLink, Link } from "react-router-dom";
import { useTokenContext } from "../../context/TokenContext";
import Avatar from "../Avatar";

const Nav = () => {
  const { token, setToken } = useTokenContext();

  return (
    <nav>
      <ul>
        {/* Si no hay token, pintamos los enlaces a registro y login */}
        {!token && (
          <>
            <li>
              <NavLink to="/register">Registro</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </>
        )}

        {token && (
          <>
            <li>
              <Link to="/">Posts</Link>
            </li>

            <li>
              <Link to="/new/post">Nuevo post </Link>
            </li>
            <li>
              <Link to="/profile">
                <Avatar />
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  setToken("");
                }}
              >
                Cerrar Sesión
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
