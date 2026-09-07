import { useForm } from "react-hook-form";
import "./Login.css";
import { useUser } from "../../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";


export default function Login() {

  const { register, handleSubmit } = useForm()

  const { login } = useUser();

  return (
    <>
      <div className="bodyLogin">

        <div className="wrapper">
          <form className="formLogin" onSubmit={handleSubmit(login)}>

            <h1>Login</h1>

            <div className="input-box">
              <input
                type="email"
                placeholder="Correo electrónico"
                {...register("email", { required: "El email es requerido", minLength: { value: 4, message: "El email debe tener al menos 4 caracteres" } })}
              />
              <FontAwesomeIcon className="iconLogin" icon={faUser} />
            </div>


            <div className="input-box">
              <input
                type="password"
                placeholder="Contraseña"
                {...register("password", { required: "El password es requerido" })}
              />
              <FontAwesomeIcon className="iconLogin" icon={faLock} />
            </div>

            <div className="remember-forgot">
              <a href="#"> Olvidaste tu contraseña? </a>
            </div>

            <button type="submit" className="button">
              Ingresar
            </button>

            <div className="register-link">
              <p> No tienes una cuenta? <a href="#"> Registrate </a> </p>
            </div>
          </form>

        </div>


      </div>
    </>

  );
}