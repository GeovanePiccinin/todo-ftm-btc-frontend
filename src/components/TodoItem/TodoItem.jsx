import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

import styles from "./TodoItem.module.css";
import { ReactComponent as IconCross } from "../../images/icon-cross.svg";
import { ReactComponent as IconCheck } from "../../images/icon-check.svg";
import clsx from "clsx";

import { useDispatch } from "react-redux";
import { toggleCompletedAsync, deleteTodoAsync } from "../../redux/todoSlice";

function TodoItem({
  task,
  index,

  handleDragStart,
  handleDragOver,
  handleDragEnd,
}) {
  const { theme } = useContext(ThemeContext);

  const dispatch = useDispatch();

  console.log("Rendering TodoItem");

  return (
    <li className={clsx(styles.li, styles[`li-${theme}`])}>
      <div
        className={clsx(
          styles.taskLabelGroup,
          styles[`taskLabelGroup-${theme}`]
        )}
        data-index={index}
        draggable={true}
        onDragStart={(e) => handleDragStart(e, index)}
        onDragEnd={handleDragEnd}
        onDragOver={() => handleDragOver(index)}
      >
        <label htmlFor={task.id} className={styles.checkboxContainer}>
          <input
            type="checkbox"
            checked={task.check}
            id={task.id}
            className={styles.inputTypeCheckbox}
            name="task"
            onChange={() => dispatch(toggleCompletedAsync(task))}
          />
          <IconCheck
            viewBox="-5 -4 22 18"
            className={clsx(
              styles.checkbox,
              styles[`checkbox-${theme}`],
              task.check ? styles.checkboxActive : ""
            )}
          />
          <span htmlFor="task">
            {task.name}{" "}
            <span
              className={styles.timePassed}
            >{` created at ${task.ellapsedMinutes} minutes ago`}</span>
          </span>
        </label>
        <button
          className={styles.deleteButton}
          onClick={() => dispatch(deleteTodoAsync(task.id))}
        >
          <IconCross />
          <span className="visually-hidden">Delete</span>
        </button>
      </div>
    </li>
  );
}
export default TodoItem;
