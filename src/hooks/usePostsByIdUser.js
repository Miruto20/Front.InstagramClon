import { useState, useEffect } from "react";
import { useTokenContext } from "../context/TokenContext";

const usePostByIdUser = (idUser) => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { token } = useTokenContext();

  /*   const addVoteToPost = ({ newAvg, voteByLoggedUser }) => {
    post.voteByLoggedUser = voteByLoggedUser;
    post.votes = newAvg;

    setPost({ ...post });
  }; */
  // console.log("idUser", idUser);

  useEffect(() => {
    const fetchPostByIdUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:4000/posts/${idUser}`, {
          headers: token ? { Authorization: token } : {},
        });
        // console.log("res", res);
        const body = await res.json();
        // console.log("body", body);

        if (!res.ok) {
          throw new Error(body.message);
        }
        setPost(body.data.post);
      } catch (error) {
        console.error(error);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostByIdUser();
  }, [idUser, token]);

  return {
    post: post,
    loading,
    errorMessage /* addVoteToPost: addVoteToPost  */,
  };
};

export default usePostByIdUser;
