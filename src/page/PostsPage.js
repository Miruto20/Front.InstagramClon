import Spinner from "../components/Spinner";
import PostList from "../components/PostList";
import { Navigate } from "react-router-dom";
import { useTokenContext } from "../context/TokenContext";

import usePosts from "../hooks/usePosts";

const PostsPage = () => {
  const { posts, errorMessage, loading } = usePosts();
  const { token, loggedUser } = useTokenContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <section>
      <h2>POSTS</h2>

      {loading && <Spinner />}
      {errorMessage && <p>Error: {errorMessage}</p>}

      {posts.length > 0 && <PostList posts={posts} />}
    </section>
  );
};

export default PostsPage;
