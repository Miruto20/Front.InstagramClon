import Spinner from "../components/Spinner";
import PostList from "../components/PostList";

import usePosts from "../hooks/usePosts";

const PostsPage = () => {
  const { posts, errorMessage, loading } = usePosts();

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
