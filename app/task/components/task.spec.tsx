import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MainTask from "./main-task";

describe.skip("<MainTask/>", () => {
  it(`should render a title "SmartTasks" and "Gerencie sua tarefas" `, () => {
    render(<MainTask />);

    const title = screen.queryByText("Smart Tasks");
    const text = screen.queryByText("Gerencie sua tarefas");

    expect(title).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
  it("should render an input and button add", () => {
    render(<MainTask />);

    const input = screen.queryByPlaceholderText("escreva sua tarefa...");
    const button = screen.queryByRole("button", { name: "Add" });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  it("should render message of error when loading layout", () => {
    render(<MainTask />);
    const text = "Este campo deve conter ao menos 6 caracteres!";
    const messageError = screen.queryByText(text);
    expect(messageError).not.toBeInTheDocument();
  });
  it("should render message of error when click button and input was empty", async () => {
    render(<MainTask />);
    const text = "Este campo deve conter ao menos 6 caracteres!";
    const user = userEvent.setup();

    const messageError = screen.queryByText(text);

    expect(messageError).not.toBeInTheDocument();

    const button = screen.getByRole("button", { name: "Add" });

    await user.click(button);

    expect(screen.queryByText(text)).toBeInTheDocument();
  });
  it("should clean input when click submit", async () => {
    render(<MainTask />);

    const valueInput = "Read 10 page of book";
    const input = screen.getByPlaceholderText("escreva sua tarefa...");
    const button = screen.getByRole("button", { name: "Add" });
    await userEvent.type(input, valueInput);

    expect(input).toHaveValue(valueInput);

    await userEvent.click(button);

    expect(input).toHaveValue("");
  });
  it("should add a new task when click submit", async () => {
    render(<MainTask />);

    const valueInput = "Read 10 page of book";
    const input = screen.getByPlaceholderText("escreva sua tarefa...");
    const button = screen.getByRole("button", { name: "Add" });
    await userEvent.type(input, valueInput);

    expect(input).toHaveValue(valueInput);

    await userEvent.click(button);

    expect(input).toHaveValue("");

    const inputd = screen.getByText(valueInput);
    expect(inputd).toBeInTheDocument();
  });
  it("should delete task when click a button delete", async () => {
    render(<MainTask />);

    const newTask = "Study Testing Library";

    const inputTask = screen.getByPlaceholderText("escreva sua tarefa...");
    const buttonAdd = screen.getByRole("button", { name: "Add" });

    await userEvent.type(inputTask, newTask);
    await userEvent.click(buttonAdd);

    screen.getByText(newTask);

    const buttonDelete = screen.getByTestId("delete-0");

    await userEvent.click(buttonDelete);

    console.log(screen.queryByText(newTask));

    expect(screen.queryByText(newTask)).not.toBeInTheDocument();
  });
  it("shoudl render with line-thought when click button completed task", async () => {
    render(<MainTask />);

    const newTask = "Study Testing Library";

    const inputTask = screen.getByPlaceholderText("escreva sua tarefa...");
    const buttonAdd = screen.getByRole("button", { name: "Add" });

    await userEvent.type(inputTask, newTask);
    await userEvent.click(buttonAdd);

    screen.getByText(newTask);

    const buttonCompleted = screen.getByTestId("isComplete-0");

    await userEvent.click(buttonCompleted);

    const getTask = screen.getByText(newTask);

    expect(getTask).toHaveClass("line-through");
  });
  it("should add 2 new tasks", async () => {
    render(<MainTask />);

    const tasks = ["Breakfast", "Read a book"];

    const inputTask = screen.getByPlaceholderText("escreva sua tarefa...");
    const buttonAdd = screen.getByRole("button", { name: "Add" });

    await userEvent.type(inputTask, tasks[0]);
    await userEvent.click(buttonAdd);

    expect(screen.getByText(tasks[0])).toBeInTheDocument();

    await userEvent.type(inputTask, tasks[1]);
    await userEvent.click(buttonAdd);

    expect(screen.getByText(tasks[1])).toBeInTheDocument();

    const buttonsDelete = screen.getAllByLabelText("delete-btn");

    expect(buttonsDelete.length).toBe(2);
  });
});
