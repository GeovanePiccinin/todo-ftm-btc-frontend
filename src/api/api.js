export const login = async (email, password) => {
  const response = await fetch(`http://localhost:3001/login`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await handleResponse(response);
  return data;
};

export const register = async (email, password) => {
  const response = await fetch(`http://localhost:3001/register`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
};

export const logout = async () => {
  const response = await fetch(`http://localhost:3001/logout`, {
    credentials: "include",
    method: "POST",
  });
  return handleResponse(response);
};

export const getTodos = async () => {
  const response = await fetch(`http://localhost:3001/todos`, {
    credentials: "include",
    method: "GET",
  });
  const data = await handleResponse(response);
  return data;
};

export const deleteTodo = async (todoId) => {
  const response = await fetch(`http://localhost:3001/todos/${todoId}`, {
    credentials: "include",
    method: "DELETE",
  });
  const data = await handleResponse(response);
  return { id: todoId, ...data };
};

export const deleteManyTodos = async (todos) => {
  let delFetch = todos.map((item) => {
    return fetch(`http://localhost:3001/todos/${item.id}`, {
      method: "DELETE",
      credentials: "include",
    });
  });
  return Promise.all([delFetch]);
};

export const updateTodo = async (todo) => {
  const response = await fetch(`http://localhost:3001/todos/${todo.id}`, {
    credentials: "include",
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const data = await handleResponse(response);
  return data;
};

export const createTodo = async (todo) => {
  const response = await fetch(`http://localhost:3001/todos`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const data = await handleResponse(response);
  return data;
};

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else if (response.status === 401) {
    console.log("not authenticated 401");

    const err = new Error("not authenticated 401");
    err.status = response.status;
    err.statusText = response.statusText;
    throw err;
  }
}
