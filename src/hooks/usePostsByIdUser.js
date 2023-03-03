import { useState, useEffect } from "react";
import { useTokenContext } from "../context/TokenContext";

const usePostByIdUser = (idUser) => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [usernamePage, setUsernamePage] = useState("");
  const [avatarPage, setAvatarPage] = useState("");

  const { token } = useTokenContext();
  /* 
  const addVoteToPost = ({ newAvg, ratedByMe }) => {
    post.ratedByMe = ratedByMe;
    post.votes = newAvg;

    setPost({ ...post });
  }; */

  useEffect(() => {
    const fetchPostByIdUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:4000/posts/${idUser}`, {
          headers: token ? { Authorization: token } : {},
        });
        const body = await res.json();

        if (!res.ok) {
          throw new Error(body.message);
        }
        setPost(body.data.post);
        setUsernamePage(body.data.post[0].username);
        setAvatarPage(body.data.post[0].avatar);
      } catch (error) {
        console.error(error);
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPostByIdUser();
  }, [idUser, token, usernamePage]);

  return {
    post: post,
    usernamePage,
    setUsernamePage,
    avatarPage,
    loading,
    errorMessage,
  };
};

export default usePostByIdUser;
