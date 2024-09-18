import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
//import { createUserWithEmailAndPassword } from "firebase/auth";
//import { auth } from "../../config/firebase";
import styles from "./Signup.module.css";
import clsx from "clsx";
import { ThemeContext } from "../../context/ThemeContext";
import { useAuthContext } from "../../context/AuthContext";
import { ReactComponent as IconEyeFill } from "../../images/iconEyeFill.svg";
import { ReactComponent as IconEyeOff } from "../../images/iconEyeOff.svg";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { register } = useAuthContext();

  const handleShowPassword = () => {
    setshowPassword(!showPassword);
  };

  /* const onSubmit = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user);
        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }; */

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await register(email, password);
    console.log("res", res);
    if (res === true) {
      navigate("/login");
    }
  };

  return (
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
        <div className={styles.password}>
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
          <div className={styles.buttonRigth}>
            <button
              className={clsx(styles.btn, styles.toggleBtn)}
              onClick={handleSignup}
            >
              Sign up
            </button>
          </div>
        </div>
      </form>

      <p>
        Already have an account? <NavLink to="/login">Sign in</NavLink>
      </p>
    </div>
  );
}
export default Signup;
