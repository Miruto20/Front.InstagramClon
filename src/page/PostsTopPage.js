import Spinner from "../components/Spinner";
import PostList from "../components/PostList";
import { Navigate } from "react-router-dom";
import { useTokenContext } from "../context/TokenContext";
import SearchForm from "../components/SearchForm/index";
import { usePostsTopContext } from "../context/PostsTopContext";

const PostsTopPage = () => {
  const {
    errorMessage,
    loading,
    addVoteToPost,
    searchParams,
    setSearchParams,
    posts,
  } = usePostsTopContext();
  const { token } = useTokenContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <section>
      <SearchForm
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <h2 className="topValueh2">Top fotos</h2>

      {loading && <Spinner />}
      {errorMessage && !token && <p>Error: {errorMessage}</p>}

      {posts.length > 0 && (
        <PostList posts={posts} addVoteToPost={addVoteToPost} />
      )}
    </section>
  );
};

export default PostsTopPage;
