import { render, screen, within } from "@testing-library/react";
import { TodoContext } from "../../context/TodoContext";
import TodoList from "./TodoList";
import { mockedTodoList } from "../../mocks/mocks";

const customRender = (component) => {
  const todoContextValue = {
    todoList: mockedTodoList,
    removeTodoItem: jest.fn(),
    markAsCompleted: jest.fn(),
    removeCompletedItems: jest.fn(),
    reorderingTodos: jest.fn(),
  };

  render(
    <TodoContext.Provider value={todoContextValue}>
      {component}
    </TodoContext.Provider>
  );
};

describe("Testing TodoList component", () => {
  it("should render the component", () => {
    customRender(<TodoList />);
  });
  it("should render items", () => {
    customRender(<TodoList />);
    const list = screen.getAllByRole("listitem");
    expect(list).toHaveLength(2);
  });
  it("should containItemLeft info", () => {
    customRender(<TodoList />);
    const itemsLeft = screen.getByText(/items left 2/i);
    expect(itemsLeft).toBeInTheDocument();
  });
  it("should render the content of items correctly", () => {
    customRender(<TodoList />);
    const list = screen.getAllByRole("listitem");

    mockedTodoList.forEach((mockedTodoItem, index) => {
      const listItem = within(list[index]);
      listItem.getByText(mockedTodoItem.name);
    });
  });
});
