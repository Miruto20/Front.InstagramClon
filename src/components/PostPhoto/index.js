import "./style.css";

const PostPhoto = ({ image, username }) => {
  username = `Esta publicación fue creada por ${username}`;
  return (
    <article>
      <img src={`http://localhost:4000/${image}`} alt={username} />
    </article>
  );
};

export default PostPhoto;
