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
import usePosts from "../../hooks/usePosts";

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
  ratedByMe,
  addVoteToPost,
}) => {
  const { token, loggedUser } = useTokenContext();
  const [showModal, setShowModal] = useState(false);
  const [showBorrarModal, setShowBorrarModal] = useState(false);
  const { posts, setPosts } = usePosts();
  // console.log("image", image);

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

      {/* {image?.length > 0 && <PostPhotos photos={image} text={text} />} */}

      <footer>
        <section className="PostVotes">
          <p>{parseFloat(rate).toFixed(2)}</p> {<PostVotesStars rate={rate} />}
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
          ) : (
            <>
              <p>Has dado esta puntuación:</p>
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
            rate={ratedByMe}
            idPost={id}
            addVoteToPost={addVoteToPost}
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
            posts={posts}
            setPosts={setPosts}
          />
        </Modal>
      )}
    </article>
  );
};

export default Post;
