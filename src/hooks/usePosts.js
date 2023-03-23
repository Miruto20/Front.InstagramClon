import { useTokenContext } from "../context/TokenContext";
import { useState, useEffect } from "react";

import { useSearchParams } from "react-router-dom";

// El custom hook usePosts carga los Posts de la API y nos retorna un objeto con los Posts, loading y errorMessage
const usePosts = () => {
  const [posts, setPosts] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const addVoteToPost = ({ id, newAvg, ratedByMe }) => {
    const index = posts.findIndex((post) => post.id === id);

    posts[index].ratedByMe = ratedByMe;
    posts[index].rate = newAvg;

    setPosts([...posts]);
  };

  const { token } = useTokenContext();

  // El effect se ejecuta después del primer render
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
        setPosts(body.data.posts);
        console.log("PostusePOST", posts);
      } catch (error) {
        // Si salta algún error, metemos el mensaje en el estado errorMessage
        setErrorMessage(error.message);
      } finally {
        // Al finalizar el fetch, cambiamos loading a false
        setLoading(false);
      }
    };

    fetchPosts();
  }, [searchParams, token]);

  return {
    posts: posts,
    errorMessage,
    loading,
    addVoteToPost: addVoteToPost,
    searchParams,
    setSearchParams,
    setPosts,
  };
};

export default usePosts;
