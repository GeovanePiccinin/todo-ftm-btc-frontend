import { useState, useEffect, useContext, useCallback, useMemo } from "react";
import clsx from "clsx";
import TaskInput from "../TaskInput";
import TodoItem from "../TodoItem";
import ListFilter from "../ListFilter";
import ItemsLeft from "../ItemsLeft/ItemsLeft";
import ClearCompleted from "../ClearCompleted/ClearCompleted";
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

  const [filterOptions, setFilterOptions] = useState("all");
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [draggingItemIndex, setDraggingItemIndex] = useState(null);

  const { theme } = useContext(ThemeContext);

  const formatTodoList = (todos) => {
    console.log("running formatTodoList");
    return todos.map((todo) => {
      const currentTime = new Date();
      const timeDifferenceMins = Math.floor(
        (currentTime - new Date(todo.createdAt)) / 60000
      );
      return { ...todo, ellapsedMinutes: timeDifferenceMins };
    });
  };

  const formattedTodoList = useMemo(() => {
    return formatTodoList(todoList);
  }, [todoList]);

  const filterTasks = (todos, filterOption) => {
    switch (filterOption) {
      case "all":
        return todos;
      case "active":
        return todos.filter((task) => task.check === false);
      case "completed":
        return todos.filter((task) => task.check === true);
      default:
        return todos;
    }
  };

  const memoizedShownTasks = useMemo(() => {
    return filterTasks(formattedTodoList, filterOptions);
  }, [formattedTodoList, filterOptions]);

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

  async function handleOnCheckTask(todo) {
    markAsCompleted(todo);
  }

  async function addTask(newTask) {
    addTodoItem(newTask);
  }

  async function handleDeleteTask(id) {
    removeTodoItem(id);
  }

  const handleClearCompleted = useCallback(() => {
    removeCompletedItems();
  }, [removeCompletedItems]);

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

    reorderingTodos(newItems);
  }

  function handleDragEnd() {
    console.log("handleDragEnd");
    setDraggingItemIndex(null);
  }

  console.log("Rendering TodoList");

  return (
    <div className={styles.wrapper}>
      <TaskInput addTask={addTask} />

      <ul className={clsx(styles.todos, styles[`todos-${theme}`])}>
        {memoizedShownTasks.map((task, index) => (
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
            <ItemsLeft itemsLeft={todoList.length} />
            <ClearCompleted handleClearCompleted={handleClearCompleted} />
          </div>
        ) : (
          <div
            className={clsx(
              styles.itemsLeftClearContainer,
              styles[`itemsLeftClearContainer-${theme}`]
            )}
          >
            <ItemsLeft itemsLeft={todoList.length} />
            <ListFilter
              handleShownActive={handleShownActive}
              handleShownAll={handleShownAll}
              handleShownCompleted={handleShownCompleted}
            />
            <ClearCompleted handleClearCompleted={handleClearCompleted} />
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
