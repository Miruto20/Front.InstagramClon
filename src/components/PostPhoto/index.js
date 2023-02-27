import "./style.css";

const PostPhoto = ({ image, username, claseAvatar }) => {
  username = `Esta publicación fue creada por ${username}`;
  return (
    <article>
      <img
        className={`${claseAvatar}`}
        src={`http://localhost:4000/${image}`}
        alt={username}
      />
    </article>
  );
};

export default PostPhoto;
