import { memo } from "react";
import styles from "./ClearCompleted.module.css";

import { useDispatch } from "react-redux";
import { removeCompletedTodosAsync } from "../../redux/todoSlice";

const ClearCompleted = memo(() => {
  const dispatch = useDispatch();
  console.log("Rendering ClearCompleted");
  return (
    <button
      onClick={() => dispatch(removeCompletedTodosAsync())}
      className={styles.clearCompletedBtn}
    >
      Clear Completed
    </button>
  );
});
export default ClearCompleted;
