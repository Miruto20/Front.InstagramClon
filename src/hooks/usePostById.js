import { useState, useEffect } from "react";
import { useTokenContext } from "../context/TokenContext";

const usePostById = (id) => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { token } = useTokenContext();

  const addVoteToPost = ({ newAvg, ratedByMe }) => {
    post.ratedByMe = ratedByMe;
    post.rate = newAvg;

    setPost({ ...post });
  };

  useEffect(() => {
    const fetchPostById = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:4000/post/${id}`, {
          headers: token ? { Authorization: token } : {},
        });

        const body = await res.json();

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

    fetchPostById();
  }, [id]);

  return { post: post, loading, errorMessage, addVoteToPost };
};

export default usePostById;
