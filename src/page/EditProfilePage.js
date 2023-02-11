import { useTokenContext } from "../context/TokenContext";
import Avatar from "../components/Avatar";
import getTimeAgo from "../utils/getTimeAgo";

const EditProfilePage = () => {
  const { loggedUser } = useTokenContext();
  const { username, createdAt, email } = loggedUser;

  return (
    <section>
      <h2> Profile </h2>

      <article>
        <Avatar />
        <h3>{username}</h3>
        <h4>email: {email}</h4>
        <p> se unió: {getTimeAgo(new Date(createdAt))}</p>
      </article>
    </section>
  );
};

export default EditProfilePage;
