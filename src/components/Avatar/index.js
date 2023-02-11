import defaultAvatar from "../../assets/images/defaultAvatar.png";
import { useTokenContext } from "../../context/TokenContext";

const Avatar = () => {
  const { loggedUser } = useTokenContext();

  const { username, avatar } = loggedUser;

  return (
    <img
      src={avatar ? `http://localhost:4000/${avatar} ` : defaultAvatar}
      alt={`${username} avatar`}
    />
  );
};

export default Avatar;
