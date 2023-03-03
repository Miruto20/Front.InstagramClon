import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PassButton = ({ email, setShowModal }) => {
  const navigate = useNavigate();

  return (
    <button
      //fetch para solicitar que te envíe un correo con una nueva contraseña
      onClick={async () => {
        try {
          const res = await fetch(
            "http://localhost:4000/users/password/recover",
            {
              method: "POST",
              body: JSON.stringify({ email }),
              headers: { "Content-Type": "application/json" },
            }
          );

          const body = await res.json();
          console.log(body);

          if (!res.ok) {
            throw new Error(body.message);
          }

          navigate("/login");

          toast.success(body.message);
        } catch (error) {
          console.error(error);
          toast.error(error.message);
        } finally {
          setShowModal(false);
        }
      }}
    >
      Cambiar contraseña
    </button>
  );
};

export default PassButton;
