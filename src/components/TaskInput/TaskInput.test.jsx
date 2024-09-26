import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskInput from "./TaskInput";

describe("Testing TaskInput", () => {
  it("should render the component", () => {
    render(<TaskInput />);
  });
  it("should have an input for a new task", () => {
    render(<TaskInput />); //render DOM
    screen.getByPlaceholderText(/Create a new task.../i); // screen => DOM => "Create a new task"
  });
  it("should type a new input", async () => {
    const user = userEvent.setup();

    const addTaskMock = jest.fn();

    render(<TaskInput addTask={addTaskMock} />);
    const input = screen.getByPlaceholderText(/Create a new task.../i);
    await user.type(input, "New task from test");
    expect(input).toHaveValue("New task from test");
    await user.keyboard("{Enter}");
    expect(input).toHaveValue("");

    expect(addTaskMock).toHaveBeenCalled();
  });
});
