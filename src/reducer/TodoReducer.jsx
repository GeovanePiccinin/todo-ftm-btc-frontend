import { act } from "react";

export const initialState = {
  todos: [],
};

export const actions = {
  INIT_STORE: "INIT_STORE",
  ADD_TODO_ITEM: "ADD_TODO_ITEM",
  REMOVE_TODO_ITEM: "REMOVE_TODO_ITEM",
  TOGGLE_COMPLETED: "TOGGLE_COMPLETED",
  REMOVE_COMPLETED_ITEMS: "REMOVE_COMPLETED_ITEMS",
  REORDERING_TODOS: "REORDERING_TODOS",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.INIT_STORE: {
      return { todos: action.value };
    }
    case actions.ADD_TODO_ITEM: {
      return { todos: [...state.todos, action.value] };
    }
    case actions.REORDERING_TODOS: {
      return { todos: [...action.value] };
    }
    case actions.TOGGLE_COMPLETED: {
      const updatedTodoList = state.todos.map((todoItem) =>
        todoItem.id === action.value.id
          ? { ...todoItem, check: !todoItem.check }
          : todoItem
      );
      return { todos: updatedTodoList };
    }
    case actions.REMOVE_TODO_ITEM: {
      const filteredTodoItem = state.todos.filter(
        (todoItem) => todoItem.id !== action.value
      );
      return { todos: filteredTodoItem };
    }
    case actions.REMOVE_COMPLETED_ITEMS: {
      return { todos: [...action.value] };
    }
    default: {
      throw Error("Unknown action " + action.type);
    }
  }
};
