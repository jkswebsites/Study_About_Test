import { render, screen } from "@testing-library/react";
import FormTest from ".";

describe("<FormTest/>", () => {
  it("should render a form", () => {
    render(<FormTest />);

    const formElement = screen.getByTestId("form-register");

    expect(formElement).toBeInTheDocument();
  });
  it("Should render a title `Formulária`", () => {
    render(<FormTest />);

    const titleElement = screen.getByText("Formulário");

    expect(titleElement).toBeInTheDocument();
  });
  it("Should render a text `Cadastre-se para usar o sistema.`", () => {
    render(<FormTest />);

    const textElement = screen.getByText("Cadastre-se para usar o sistema.");

    expect(textElement).toBeInTheDocument();
  });
  it(`should render a label written "Username" and "Password"`, () => {
    render(<FormTest />);

    const labelUsername = screen.getByText("Username");
    const labelPassword = screen.getByText("Password");

    expect(labelUsername).toBeInTheDocument();
    expect(labelPassword).toBeInTheDocument();
  });
  it("should contain 2 input", () => {
    render(<FormTest />);

    const inputsElement = screen.getAllByRole("textbox");

    expect(inputsElement.length).toEqual(2);
  });
  it("should contain 2 button", () => {
    render(<FormTest />);

    const buttonsElement = screen.getAllByRole("button");

    expect(buttonsElement.length).toEqual(2);
  });
  it(`should contain a button with text "Confirmar"`, () => {
    render(<FormTest />);

    const buttonConfirm = screen.getByRole("button", { name: "Confirmar" });
    const buttonCancel = screen.getByRole("button", { name: "Cancelar" });

    expect(buttonConfirm).toBeInTheDocument();
    expect(buttonCancel).toBeInTheDocument();
  });
});
