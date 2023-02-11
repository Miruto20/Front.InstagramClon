import "./style.css";
import getTimeAgo from "../../utils/getTimeAgo";
// import PostVotesStars from "../PostVotesStars";
// import PostPhotos from "../PostPhotos";
// import Modal from "../Modal";
import { useTokenContext } from "../../context/TokenContext";
// import { useState } from "react";
import PostPhoto from "../PostPhoto";

const Post = ({
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
}) => {
  const { token, loggedUser } = useTokenContext();
  /*   const [showModal, setShowModal] = useState(false);
   */
  console.log("image", image);

  return (
    <article className="post">
      <header>
        <h3>{username}</h3>
        <h4>{place}</h4>
      </header>

      <p>{text}</p>
      {image?.length > 0 && <PostPhoto image={image} username={username} />}

      {/* {image?.length > 0 && <PostPhotos photos={image} text={text} />} */}

      <footer>
        {/*    <section className="PostVotes">
          <p>{parseFloat(votes).toFixed(2)}</p>{" "}
          {<PostVotesStars votes={votes} />}
        </section> */}
        <span>·</span>
        <p className="PostDateAuthor">
          Publicado por <span>usuario {idUser} </span>
          {getTimeAgo(new Date(createdAt))}
        </p>

        {token && loggedUser.id !== idUser && (
          <>
            <span>·</span>
            {/*        <button
              onClick={(event) => {
                event.preventDefault();

                setShowModal(true);
              }}
            >
              Votar
            </button> */}
          </>
        )}
      </footer>

      {/*           {showModal && (
        <Modal setShowModal={setShowModal}>
          {!voteByLoggedUser ? (
            <p>Escoge la puntuación que le quieres dar a la entrada:</p>
          ) : (
            <p>Has dado esta puntuación:</p>
          )}

          <PostVotesStars
            votes={voteByLoggedUser}
            PostId={id}
            addVoteToPost={addVoteToPost}
          />
        </Modal>
      )}  */}
    </article>
  );
};

export default Post;
