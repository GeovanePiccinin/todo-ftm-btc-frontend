import { createContext, useReducer, useEffect, useContext } from "react";
import { reducer, initialState, actions } from "../reducer/TodoReducer";
import {
  deleteManyTodos,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../api/api";
import { useAuthContext } from "./AuthContext";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, signout } = useAuthContext();

  const handleError = (e) => {
    if (e.status === 401) {
      signout();
    }
  };

  const value = {
    todoList: state.todos,
    addTodoItem: async (todo) => {
      createTodo(todo)
        .then((todo) => dispatch({ type: actions.ADD_TODO_ITEM, value: todo }))
        .catch((e) => handleError(e));
    },
    removeTodoItem: async (todoId) => {
      deleteTodo(todoId)
        .then(dispatch({ type: actions.REMOVE_TODO_ITEM, value: todoId }))
        .catch((e) => handleError(e));
    },
    removeCompletedItems: async () => {
      const [toBeRemovedItems, remainingItems] = state.todos.reduce(
        ([truthies, falsies], item) =>
          item.check === false
            ? [truthies, [...falsies, item]]
            : [[...truthies, item], falsies],
        [[], []]
      );
      deleteManyTodos(toBeRemovedItems)
        .then(
          dispatch({
            type: actions.REMOVE_COMPLETED_ITEMS,
            value: remainingItems,
          })
        )
        .catch((e) => handleError(e));
    },
    markAsCompleted: async (todo) => {
      console.log("mark as completed todo", todo);
      const updatedTodo = await updateTodo({ ...todo, check: !todo.check });
      if (updateTodo) {
        dispatch({ type: actions.TOGGLE_COMPLETED, value: updatedTodo });
      }
    },
    reorderingTodos: async (todos) => {
      dispatch({ type: actions.REORDERING_TODOS, value: todos });
    },
  };

  useEffect(() => {
    if (user) {
      getTodos()
        .then((todos) => {
          dispatch({ type: actions.INIT_STORE, value: todos });
        })
        .catch((e) => {
          handleError(e);
        });
    }
  }, [user]);

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => useContext(TodoContext);
