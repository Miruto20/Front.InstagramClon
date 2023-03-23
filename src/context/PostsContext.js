import { createContext, useContext, useEffect, useState } from "react";
import { useTokenContext } from "../context/TokenContext";
import { useSearchParams } from "react-router-dom";

export const PostsContext = createContext();

export const CustomPostsContextProvider = ({ children }) => {
  const [posts, setPosts] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const addVoteToPost = ({ id, newAvg, valueRated }) => {
    const index = posts.findIndex((post) => post.id === id);

    posts[index].valueRated = valueRated;
    posts[index].rate = newAvg;

    setPosts([...posts]);
  };

  const { token } = useTokenContext();

  // useEffect que se ejecuta después del primer render y cada vez que el token cambia
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Cuando empezamos a hacer el fetch, cambiamos el estado loading a true
        setLoading(true);

        // Hacemos el fetch y recogemos la respuesta del servidor
        const res = await fetch(
          `http://localhost:4000/posts?${searchParams.toString()}`,
          {
            headers: token ? { Authorization: token } : {},
          }
        );

        // Nos traemos el body de la respuesta
        const body = await res.json();

        // Si la respuesta no viene bien, lanzamos un error con el mensaje que viene de la API
        if (!res.ok) {
          throw new Error(body.message);
        }

        // Cargamos los datos de los posts en el estado de posts
        setPosts([...body.data.posts]);
        console.log("postsPostsContext", body.data.posts);
      } catch (error) {
        // Si salta algún error, metemos el mensaje en el estado errorMessage
        setErrorMessage(error.message);
      } finally {
        // Al finalizar el fetch, cambiamos loading a false
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token, searchParams, setPosts]);

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
        addVoteToPost,
        loading,
        errorMessage,
        searchParams,
        setSearchParams,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePostsContext = () => {
  return useContext(PostsContext);
};
