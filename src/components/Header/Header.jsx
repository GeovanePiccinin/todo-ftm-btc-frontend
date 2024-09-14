import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { ReactComponent as SunIcon } from "../../images/icon-sun.svg";
import { ReactComponent as MoonIcon } from "../../images/icon-moon.svg";
import styles from "./Header.module.css";

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>TODO</h1>
      {theme === "light" ? (
        <MoonIcon onClick={toggleTheme} className={styles.themeToggle} />
      ) : (
        <SunIcon onClick={toggleTheme} className={styles.themeToggle} />
      )}
    </header>
  );
}
export default Header;
