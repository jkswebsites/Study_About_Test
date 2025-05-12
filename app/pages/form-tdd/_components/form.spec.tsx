import { logRoles, render, screen } from "@testing-library/react";
import FormTDD from "./form";
import userEvent from "@testing-library/user-event";
const errorsMessages = [
  "Campo nome é obrigatório!",
  "Campo sobrenome é obrigatório!",
];

describe("<FormTDD/>", () => {
  it("should render component <FormTDD/>", () => {
    const view = render(<FormTDD />);
    logRoles(view.container);
  });
  it(`should render the subtitle 'Form TDD' `, () => {
    render(<FormTDD />);

    const subtitleElement = screen.queryByRole("heading", { name: "Form TDD" });

    expect(subtitleElement).toBeInTheDocument();
  });
  it("should render two inputs", () => {
    render(<FormTDD />);

    const inputs = screen.getAllByRole("textbox");

    expect(inputs.length).toBe(2);
  });
  it(`shouldn't render texts of errors '${errorsMessages[0]}' and '${errorsMessages[1]}' `, () => {
    render(<FormTDD />);
    const textName = "Campo nome é obrigatório!";
    const textlastName = "Campo sobrenome é obrigatório!";

    const getTextName = screen.queryByText(textName);
    const getTextLastName = screen.queryByText(textlastName);

    expect(getTextName).not.toBeInTheDocument();
    expect(getTextLastName).not.toBeInTheDocument();
  });
  it(`should render a button submit 'Envidar' `, () => {
    render(<FormTDD />);

    const button = screen.queryByRole("button", { name: "Enviar" });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "submit");
  });
  it(`should render '${errorsMessages[0]}' when click button Enviar and field name was empty`, async () => {
    render(<FormTDD />);
    const user = userEvent.setup();
    const inputLastName = screen.getByPlaceholderText("Sobrenome");

    await user.type(inputLastName, "Santos");

    const buttonElement = screen.getByRole("button", { name: "Enviar" });

    await user.click(buttonElement);

    const errorName = screen.getByText(errorsMessages[0]);

    expect(errorName).toBeInTheDocument();

    const errorLastName = screen.queryByText(errorsMessages[1]);

    expect(errorLastName).not.toBeInTheDocument();
  });
  it(`should render '${errorsMessages[1]}' when click button Enviar and field name was empty`, async () => {
    render(<FormTDD />);
    const user = userEvent.setup();
    const inputName = screen.getByPlaceholderText("Nome");

    await user.type(inputName, "Maria");

    const buttonElement = screen.getByRole("button", { name: "Enviar" });

    await user.click(buttonElement);

    const errorName = screen.getByText(errorsMessages[1]);

    expect(errorName).toBeInTheDocument();

    const errorLastName = screen.queryByText(errorsMessages[0]);

    expect(errorLastName).not.toBeInTheDocument();
  });
  it(`should render 2 message of error '${errorsMessages[0]}' and '${errorsMessages[1]}' if fields were empty`, async () => {
    render(<FormTDD />);
    const user = userEvent.setup();

    const buttonElement = screen.getByRole("button", { name: "Enviar" });

    await user.click(buttonElement);

    screen.getByText(errorsMessages[0]);
    screen.getByText(errorsMessages[1]);
  });
  it(`shouldn't render the 2 messages of error if fields were fill`, async () => {
    render(<FormTDD />);
    const user = userEvent.setup();

    const inputName = screen.getByPlaceholderText("Nome");
    const inputLastName = screen.getByPlaceholderText("Sobrenome");

    await user.click(inputName);
    await user.keyboard("Ana");

    await user.click(inputLastName);
    await user.keyboard("Luíza");

    const buttonElement = screen.getByRole("button", { name: "Enviar" });

    await user.click(buttonElement);

    const messageErrorName = screen.queryByText(errorsMessages[0]);
    const messageErrorLastName = screen.queryByText(errorsMessages[1]);

    expect(messageErrorName).not.toBeInTheDocument();
    expect(messageErrorLastName).not.toBeInTheDocument();
  });
});
