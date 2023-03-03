import "./style.css";
import getTimeAgo from "../../utils/getTimeAgo";
import PostVotesStars from "../../components/PostVotesStars/index";
import Modal from "../Modal";
import DeletePost from "../DeletePost";
import { useTokenContext } from "../../context/TokenContext";
import { useState } from "react";
import PostPhoto from "../PostPhoto";
import { Link, NavLink } from "react-router-dom";

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
          <NavLink to={`/posts/${idUser}`} className="postUsername">
            <img
              src={`http://localhost:4000/${avatar}`}
              alt="avatar usuarioPost"
              className="avatarPost"
            />
            {username}
          </NavLink>
          <p className="postPlace">{place}</p>
        </h3>
        <button
          onClick={(event) => {
            event.preventDefault();

            setShowModal(true);
          }}
        >
          <ion-icon className="iconoPost" name="star-half-outline"></ion-icon>
        </button>
      </header>

      {image?.length > 0 && (
        <Link to={`/post/${id}`}>
          <PostPhoto
            image={image}
            username={username}
            claseAvatar="imgFilter"
          />
        </Link>
      )}

      <div>
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

        <p className="PostDateAuthor">{getTimeAgo(new Date(createdAt))}</p>

        {token && loggedUser.id !== +idUser && <></>}

        {token && loggedUser.id === +idUser && (
          <>
            <button
              onClick={(event) => {
                event.preventDefault();

                setShowBorrarModal(true);
              }}
            >
              <ion-icon className="iconoPost" name="trash-outline"></ion-icon>
            </button>
          </>
        )}
      </div>
      <p className="postText">{text}</p>

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
            className="buttonVolver"
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
