import "./style.css";
import { Link } from "react-router-dom";
import Post from "../Post/";

const PostList = ({ posts, addVoteToPost }) => {
  return (
    <ul className="PostList">
      {posts.map((post) => {
        const {
          id,
          text,
          image,
          avatar,
          username,
          email,
          place,
          idUser,
          rate,
          owner,
          createdAt,
        } = post;

        return (
          <li key={id}>
            <Link to={`/posts/${id}`}>
              <Post
                id={id}
                text={text}
                image={image}
                avatar={avatar}
                username={username}
                email={email}
                place={place}
                idUser={idUser}
                rate={rate}
                owner={owner}
                createdAt={createdAt}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default PostList;
