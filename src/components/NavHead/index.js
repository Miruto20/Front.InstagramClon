import "./style.css";
import { useTokenContext } from "../../context/TokenContext";
const NavHead = () => {
  const { token, setToken } = useTokenContext();
  return (
    <nav className="navbarHead">
      <ul className="navbarHead">
        {/* Si hay token,y está loggeado pintamos el botton desconectar */}

        <>
          <li>
            <img src="/LOGO.png" className="imgLogo" alt="Casigram Logo" />
          </li>
          <li className="h1Container">
            <h1>C A S I G R A M</h1>
          </li>
        </>

        {token && (
          <>
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
