import { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import TaskInput from "../TaskInput";
import TodoItem from "../TodoItem";
import ListFilter from "../ListFilter";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "./TodoList.module.css";

function TodoList() {
  const [tasks, setTasks] = useState([
    { name: "task 1", id: 1, check: false },
    { name: "task 2", id: 2, check: false },
  ]);
  const [shownTasks, setShownTasks] = useState([]);
  const [filterOptions, setFilterOptions] = useState("all");
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [draggingItemIndex, setDraggingItemIndex] = useState(null);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setShownTasks(tasks);
  }, []);

  useEffect(() => {
    const filterTasks = (filterOption) => {
      switch (filterOption) {
        case "all":
          return tasks;
        case "active":
          return tasks.filter((task) => task.check === false);
        case "completed":
          return tasks.filter((task) => task.check === true);
        default:
          return tasks;
      }
    };
    const filteredTasks = filterTasks(filterOptions);
    setShownTasks(filteredTasks);
  }, [filterOptions, tasks]);

  function handleOnCheckTask(id) {
    console.log("handleOnCheckTask");
    const clonedTasks = [...tasks];
    setTasks(
      clonedTasks.map((t) => (t.id === id ? { ...t, check: !t.check } : t))
    );
  }

  function addTask(newTask) {
    setTasks([...tasks, newTask]);
  }

  function handleDeleteTask(id) {
    const updatedTasks = tasks.filter((item) => item.id !== id);
    setTasks(updatedTasks);
  }

  function handleClearCompleted() {
    const clearedTasks = tasks.filter((task) => task.check !== true);
    setTasks(clearedTasks);
  }

  function handleShownCompleted() {
    setFilterOptions("completed");
  }
  function handleShownActive() {
    setFilterOptions("active");
  }
  function handleShownAll() {
    setFilterOptions("all");
  }

  function handleDragStart(e, index) {
    console.log("handleDragStart", index);
    setDraggingItemIndex(index);
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDragOver(index) {
    console.log("handleDragOver", index);
    if (draggingItemIndex === index) {
      console.log(
        "draggingItemIndex === index",
        draggingItemIndex === index,
        draggingItemIndex,
        index
      );
      return;
    }
    const newItems = [...tasks];
    const draggingItem = newItems[draggingItemIndex];
    newItems.splice(draggingItemIndex, 1);
    newItems.splice(index, 0, draggingItem);
    setDraggingItemIndex(index);

    console.log("newItems", newItems);

    setTasks(newItems);
  }

  function handleDragEnd() {
    console.log("handleDragEnd");
    setDraggingItemIndex(null);
  }

  const ClearCompleted = () => (
    <button onClick={handleClearCompleted} className={styles.button}>
      Clear Completed
    </button>
  );

  //console.log("tasks", tasks);

  return (
    <div className={styles.wrapper}>
      <TaskInput addTask={addTask} />

      <ul className={clsx(styles.todos, styles[`todos-${theme}`])}>
        {shownTasks.map((task, index) => (
          <TodoItem
            key={index}
            index={index}
            task={task}
            handleDeleteTask={handleDeleteTask}
            handleOnCheckTask={handleOnCheckTask}
            handleDragEnd={handleDragEnd}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
          />
        ))}

        {windowSize.width < 600 ? (
          <div
            className={clsx(
              styles.itemsLeftClearContainer,
              styles[`itemsLeftClearContainer-${theme}`]
            )}
          >
            <p className={clsx(styles.itemsLeft, styles[`itemsLeft-${theme}`])}>
              {" "}
              Items Left {tasks.length}
            </p>
            <ClearCompleted />
          </div>
        ) : (
          <div
            className={clsx(
              styles.itemsLeftClearContainer,
              styles[`itemsLeftClearContainer-${theme}`]
            )}
          >
            <p className={clsx(styles.itemsLeft, styles[`itemsLeft-${theme}`])}>
              {" "}
              Items Left {tasks.length}
            </p>
            <ListFilter
              handleShownActive={handleShownActive}
              handleShownAll={handleShownAll}
              handleShownCompleted={handleShownCompleted}
            />
            <ClearCompleted />
          </div>
        )}
      </ul>
      {windowSize.width < 600 ? (
        <ListFilter
          handleShownActive={handleShownActive}
          handleShownAll={handleShownAll}
          handleShownCompleted={handleShownCompleted}
        />
      ) : null}
    </div>
  );
}
export default TodoList;
