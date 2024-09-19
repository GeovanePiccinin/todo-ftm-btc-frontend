import { memo } from "react";
import styles from "./ClearCompleted.module.css";

const ClearCompleted = memo(({ handleClearCompleted }) => {
  console.log("Rendering ClearCompleted");
  return (
    <button onClick={handleClearCompleted} className={styles.clearCompletedBtn}>
      Clear Completed
    </button>
  );
});
export default ClearCompleted;
