import "./style.css";

import { NavLink, Link } from "react-router-dom";
import { useTokenContext } from "../../context/TokenContext";
import Avatar from "../Avatar";

const Nav = () => {
  const { token, setToken, loggedUser } = useTokenContext();
  const { id } = loggedUser;

  return (
    <nav className="navbar">
      <ul className="navbar">
        {/* Si no hay token, pintamos los enlaces a registro y login */}
        {!token && (
          <>
            <li>
              <NavLink to="/register">Registro</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/recover/password/:recoverPassCode"></NavLink>
            </li>
          </>
        )}

        {token && (
          <>
            <li className="navicon">
              <Link to="/">
                <i className="fa-regular fa-images"></i>
              </Link>
            </li>

            <li className="navicon">
              <Link to="/new/post">LALALAL</Link>
            </li>
            <li>
              <Link to={`/posts/${id}`}> Post del Usuario </Link>
            </li>
            <li>
              <Link to="/profile">
                <Avatar />
              </Link>
            </li>
            <li>
              <NavLink to="/recover/password/:recoverPassCode"></NavLink>
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
