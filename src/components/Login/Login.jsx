import { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import clsx from "clsx";

import { ThemeContext } from "../../context/ThemeContext";
import { useAuthContext } from "../../context/AuthContext";
import styles from "./Login.module.css";
import { ReactComponent as IconEyeFill } from "../../images/iconEyeFill.svg";
import { ReactComponent as IconEyeOff } from "../../images/iconEyeOff.svg";
/* import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../config/firebase"; */

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const { theme } = useContext(ThemeContext);

  const { login } = useAuthContext();

  /* const handleGoogleAuthentication = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }; */

  const handleShowPassword = () => {
    setshowPassword(!showPassword);
  };

  /* const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }; */

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    console.log("res", res);
    if (res === true) {
      navigate("/");
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <form className={clsx(styles.form, styles[`${theme}Form`])}>
          <div>
            <label className="visually-hidden" htmlFor="email-address">
              E-mail:
            </label>
            <input
              className={clsx(styles.input, styles[`${theme}Input`])}
              id="email-address"
              type="email"
              name="email"
              required
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <label className="visually-hidden" htmlFor="password">
              Password:
            </label>
            <div className={styles.passwordInput}>
              <input
                className={clsx(styles.input, styles[`${theme}Input`])}
                type={showPassword === true ? "text" : "password"}
                name="password"
                id="password"
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <div className={styles.passwordEye}>
                {showPassword ? (
                  <IconEyeOff onClick={handleShowPassword} />
                ) : (
                  <IconEyeFill onClick={handleShowPassword} />
                )}
              </div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            {/*   <div
              onClick={handleGoogleAuthentication}
              className={clsx(styles.btn, styles.toggleBtn, styles.buttonLeft)}
            >
              Login with Google
            </div> */}
            <div>
              <button
                className={clsx(styles.btn, styles.toggleBtn)}
                onClick={handleLogin}
                name="login"
              >
                Login
              </button>
            </div>
          </div>
        </form>
        <p>
          No account yet? <NavLink to="/signup">Sign up</NavLink>
        </p>
      </div>
    </>
  );
}
export default Login;
