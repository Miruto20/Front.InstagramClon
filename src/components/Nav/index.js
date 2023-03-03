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
                <ion-icon name="home-outline"></ion-icon>
              </Link>
            </li>
            <li className="navicon">
              <Link to="/posts/top">
                {" "}
                <ion-icon name="ribbon-outline"></ion-icon>
              </Link>
            </li>
            <li className="navicon">
              <Link to="/new/post">
                <ion-icon name="add-circle-outline"></ion-icon>
              </Link>
            </li>
            <li className="navicon">
              <Link to="/profile">
                <ion-icon name="settings-outline"></ion-icon>
              </Link>
            </li>
            <li>
              <Link to={`/posts/${id}`}>
                {" "}
                <Avatar claseAvatar="fotoAvatarPeque" />
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
