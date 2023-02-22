import "./style.css";
import getTimeAgo from "../../utils/getTimeAgo";
import PostVotesStars from "../../components/PostVotesStars/index";
// import PostPhotos from "../PostPhotos";
import Modal from "../Modal";
import DeletePost from "../DeletePost";
import { useTokenContext } from "../../context/TokenContext";
import { useState } from "react";
import PostPhoto from "../PostPhoto";
import { NavLink } from "react-router-dom";
import StarIcon from "../StarIcon";
// import usePosts from "../../hooks/usePosts";

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
  ratedByMe,
  owner,
  valueRated,
  createdAt,
  addVoteToPost,
}) => {
  const { token, loggedUser } = useTokenContext();
  // startsToFill es el número de estrellas que queremos pintar. Si la votación de la entrada es 2.6 pintaremos 3 estrellas, si es 2.4 pintaremos 2
  // const starsToFill = Math.round(rate);

  const [showModal, setShowModal] = useState(false);
  const [showBorrarModal, setShowBorrarModal] = useState(false);

  return (
    <article className="post">
      <header>
        <h3>
          <NavLink to={`/posts/${idUser}`}>{username}</NavLink>
        </h3>
        <h4>{place}</h4>
      </header>

      <p>{text}</p>
      {image?.length > 0 && <PostPhoto image={image} username={username} />}

      <footer>
        <section className="PostVotes">
          <p>{parseFloat(rate).toFixed(2)}</p>{" "}
          {
            <PostVotesStars
              rate={rate}
              idPost={id}
              addVoteToPost={addVoteToPost}
            />
          }
        </section>
        <span>·</span>
        <p className="PostDateAuthor">
          Publicado por <span> {username} </span>
          {getTimeAgo(new Date(createdAt))}
        </p>

        {token && loggedUser.id !== idUser && (
          <>
            <span>·</span>
            <button
              onClick={(event) => {
                event.preventDefault();

                setShowModal(true);
              }}
            >
              Votar
            </button>
          </>
        )}

        {token && loggedUser.id === idUser && (
          <>
            <span>·</span>
            <button
              onClick={(event) => {
                event.preventDefault();

                setShowBorrarModal(true);
              }}
            >
              Borrar Post
            </button>
          </>
        )}
      </footer>

      {showModal && (
        <Modal setShowModal={setShowModal}>
          {ratedByMe ? (
            <section>
              <p>Has dado esta puntuación: </p>
              <button
                onClick={() => {
                  setShowModal(false);
                }}
              >
                cancelar
              </button>
            </section>
          ) : (
            <>
              <p>Escoge la puntuación que le quieres dar a la entrada:</p>
              <button
                onClick={() => {
                  setShowModal(false);
                }}
              >
                cancelar
              </button>
            </>
          )}

          <PostVotesStars
            rate={valueRated}
            idPost={id}
            addVoteToPost={addVoteToPost}
            setShowModal={setShowModal}
          />
        </Modal>
      )}

      {showBorrarModal && (
        <Modal setShowBorrarModal={setShowBorrarModal}>
          <button
            onClick={() => {
              setShowBorrarModal(false);
            }}
          >
            volver
          </button>

          <DeletePost
            idUser={idUser}
            idPost={id}
            setShowBorrarModal={setShowBorrarModal}
          />
        </Modal>
      )}
    </article>
  );
};

export default Post;
