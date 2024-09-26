import clsx from "clsx";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./ListFilter.module.css";
function ListFilter({
  handleShownActive,
  handleShownAll,
  handleShownCompleted,
}) {
  const { theme } = useContext(ThemeContext);

  console.log("Rendering ListFilter");

  return (
    <div className={clsx(styles.listFilters, styles[`listFilters-${theme}`])}>
      <button name="all" onClick={handleShownAll} className={styles.button}>
        All
      </button>
      <button
        name="active"
        onClick={handleShownActive}
        className={styles.button}
      >
        Active
      </button>
      <button
        name="completed"
        onClick={handleShownCompleted}
        className={styles.button}
      >
        Completed
      </button>
    </div>
  );
}
export default ListFilter;
