import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTokenContext } from "../../context/TokenContext";

const EmailButton = ({ email, setShowMailModal, newEmail }) => {
  const navigate = useNavigate();
  const { token } = useTokenContext();

  return (
    <button
      //fetch para solicitar cambio de correo
      onClick={async () => {
        try {
          const res = await fetch("http://localhost:4000/users/email/recover", {
            method: "POST",
            body: JSON.stringify({ email, newEmail }),
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          });

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
          setShowMailModal(false);
        }
      }}
    >
      Cambiar email
    </button>
  );
};

export default EmailButton;
