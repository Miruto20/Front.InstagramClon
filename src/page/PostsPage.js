import Spinner from "../components/Spinner";
import PostList from "../components/PostList";
import { Navigate } from "react-router-dom";
import { useTokenContext } from "../context/TokenContext";
import SearchForm from "../components/SearchForm/index";

import usePosts from "../hooks/usePosts";

const PostsPage = () => {
  const {
    posts,
    errorMessage,
    loading,
    addVoteToPost,
    searchParams,
    setSearchParams,
  } = usePosts();
  const { token, loggedUser } = useTokenContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <section>
      <SearchForm
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <h2>POSTS</h2>

      {loading && <Spinner />}
      {errorMessage && <p>Error: {errorMessage}</p>}

      {posts.length > 0 && (
        <PostList posts={posts} addVoteToPost={addVoteToPost} />
      )}
    </section>
  );
};

export default PostsPage;
