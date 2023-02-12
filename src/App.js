import "./App.css";
import RegisterPage from "./page/RegisterPage";
import { Routes, Route, Link } from "react-router-dom";
import PostsPage from "./page/PostsPage";
import LoginPage from "./page/LoginPage";
import NewPostPage from "./page/NewPostPage";
import ValidationPage from "./page/ValidationPage";
import EditProfilePage from "./page/EditProfilePage";
import PostPage from "./page/PostPage/index";
import Nav from "./components/Nav";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import RecoverPasswordPage from "./page/RecoverPasswordPage/index";

function App() {
  return (
    <>
      <header>
        {/*  <Routes>
          <Route path="/" element={<PostsPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<h1>Titulo new user</h1>} />
          <Route path="/C" element={<h1>Titulo new entry</h1>} />
        </Routes> */}
      </header>

      <Nav />

      <main>
        <Routes>
          <Route path="/" element={<PostsPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/new/post" element={<NewPostPage />} />
          <Route path="/profile" element={<EditProfilePage />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route
            path="/recover/password/:recoverPassCode"
            element={<RecoverPasswordPage />}
          />

          <Route
            path="/validate/:registrationCode"
            element={<ValidationPage />}
          />

          <Route path="/*" element={<h1>Not Found</h1>} />
        </Routes>
      </main>

      {/* Componente que se encarga de mostrar las alertas lanzadas con la función "toast" */}
      <ToastContainer position="bottom-center" pauseOnHover theme="dark" />
    </>
  );
}

export default App;
