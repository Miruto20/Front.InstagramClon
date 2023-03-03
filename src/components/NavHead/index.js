import "./style.css";
import { NavLink, Link } from "react-router-dom";
import { useTokenContext } from "../../context/TokenContext";
import SearchForm from "../SearchForm/index.js";
const NavHead = () => {
  const { token, setToken, loggedUser } = useTokenContext();
  const { id } = loggedUser;
  return (
    <nav className="navbarHead">
      <ul className="navbarHead">
        {/* Si no hay token, pintamos los enlaces a registro y login */}
        {!token && (
          <>
            <li>
              <img src="/LOGO.png" className="imgLogo" alt="Casigram Logo" />
            </li>
            <li>
              <h1>C A S I G R A M</h1>
            </li>
          </>
        )}
        {token && (
          <>
            <li>
              <img src="/LOGO.png" className="imgLogo" alt="Casigram Logo" />
            </li>
            <li className="h1Container">
              <h1>C A S I G R A M</h1>
            </li>

            <li>
              <button
                className="navicon"
                onClick={() => {
                  setToken("");
                }}
              >
                <ion-icon name="log-out-outline"></ion-icon>
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
export default NavHead;
