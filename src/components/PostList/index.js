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
          ratedByMe,
          valueRated,
          createdAt,
        } = post;

        return (
          <li key={id}>
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
              ratedByMe={ratedByMe}
              valueRated={valueRated}
              owner={owner}
              createdAt={createdAt}
              addVoteToPost={addVoteToPost}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default PostList;
