import { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import TaskInput from "../TaskInput";
import TodoItem from "../TodoItem";
import ListFilter from "../ListFilter";
import { ThemeContext } from "../../context/ThemeContext";
import { useTodoContext } from "../../context/TodoContext";

import styles from "./TodoList.module.css";

function TodoList() {
  const {
    todoList,
    addTodoItem,
    removeTodoItem,
    markAsCompleted,
    removeCompletedItems,
    reorderingTodos,
  } = useTodoContext();

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
    setShownTasks(todoList);
  }, [todoList]);

  useEffect(() => {
    const filterTasks = (filterOption) => {
      switch (filterOption) {
        case "all":
          return todoList;
        case "active":
          return todoList.filter((task) => task.check === false);
        case "completed":
          return todoList.filter((task) => task.check === true);
        default:
          return todoList;
      }
    };
    const filteredTasks = filterTasks(filterOptions);
    setShownTasks(filteredTasks);
  }, [filterOptions, todoList]);

  async function handleOnCheckTask(todo) {
    markAsCompleted(todo);
  }

  async function addTask(newTask) {
    addTodoItem(newTask);
  }

  async function handleDeleteTask(id) {
    removeTodoItem(id);
  }

  function handleClearCompleted() {
    removeCompletedItems();
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
    const newItems = [...todoList];
    const draggingItem = newItems[draggingItemIndex];
    newItems.splice(draggingItemIndex, 1);
    newItems.splice(index, 0, draggingItem);
    setDraggingItemIndex(index);

    console.log("newItems", newItems);

    reorderingTodos(newItems);
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

  console.log("shownTasks", shownTasks);

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
              Items Left {todoList.length}
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
              Items Left {todoList.length}
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
