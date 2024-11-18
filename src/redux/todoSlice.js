import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo as deleteTodoApi,
  deleteManyTodos,
} from "../api/api";

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async (payload, thunkAPI) => {
    return getTodos();
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (payload) => {
    return createTodo(payload);
  }
);

export const toggleCompletedAsync = createAsyncThunk(
  "todos/toggleCompletedAsync",
  async (payload) => {
    return updateTodo({ ...payload, check: !payload.check });
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodoAsync",
  async (payload) => {
    return deleteTodoApi(payload);
  }
);

export const removeCompletedTodosAsync = createAsyncThunk(
  "todos/removeCompletedTodosAsync",
  async (payload, { getState }) => {
    const { todos } = getState();
    const toBeRemovedTodos = todos.filter((todo) => todo.check === true);
    deleteManyTodos(toBeRemovedTodos);
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    reorderingTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodosAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addTodoAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(toggleCompletedAsync.fulfilled, (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].check = action.payload.check;
    });
    builder.addCase(deleteTodoAsync.fulfilled, (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    });
    builder.addCase(removeCompletedTodosAsync.fulfilled, (state, action) => {
      return state.filter((todo) => todo.check === false);
    });
  },
});

export const { reorderingTodos } = todoSlice.actions;
export default todoSlice.reducer;
