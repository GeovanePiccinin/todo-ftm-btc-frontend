import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { ReactComponent as SunIcon } from "../../images/icon-sun.svg";
import { ReactComponent as MoonIcon } from "../../images/icon-moon.svg";
import { ReactComponent as SignoutIcon } from "../../images/signout.svg";
//import { auth } from "../../config/firebase";
//import { signOut } from "firebase/auth";
import styles from "./Header.module.css";
import { useAuthContext } from "../../context/AuthContext";

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useAuthContext();

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>TODO</h1>
      <div className={styles.iconContainer}>
        {theme === "light" ? (
          <MoonIcon onClick={toggleTheme} className={styles.themeToggle} />
        ) : (
          <SunIcon onClick={toggleTheme} className={styles.themeToggle} />
        )}
        {user && (
          <SignoutIcon className={styles.themeToggle} onClick={handleLogout} />
        )}
      </div>
    </header>
  );
}
export default Header;
