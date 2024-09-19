import clsx from "clsx";
import { useState, useContext } from "react";
import styles from "./TaskInput.module.css";
import { ThemeContext } from "../../context/ThemeContext";

function TaskInput({ addTask }) {
  const [newTask, setNewTask] = useState("");
  const { theme } = useContext(ThemeContext);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    if (newTask.trim() !== "") {
      addTask({
        name: newTask,
        check: false,
        createdAt: new Date(),
      });
      setNewTask("");
    }
  }

  console.log("Rendering TaskInput");

  return (
    <form
      className={clsx(styles.form, styles[`form-${theme}`])}
      onSubmit={handleOnSubmit}
    >
      <label className="visually-hidden" htmlFor="new-task-input">
        Enter new Task
      </label>
      <input
        type="text"
        id="new-task-input"
        placeholder="Create a new task..."
        autoComplete="off"
        className={clsx(styles.newTaskInput, styles[`newTaskInput-${theme}`])}
        onChange={handleInputChange}
        value={newTask}
      />
    </form>
  );
}
export default TaskInput;
