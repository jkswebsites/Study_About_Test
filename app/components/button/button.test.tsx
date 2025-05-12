import { render, screen } from "@testing-library/react";
import Button from ".";

describe("<Button/>", () => {
  it("should render button", () => {
    const { getByText, getByRole } = render(<Button>Confirmar</Button>);

    const buttonElement = getByRole("button");
    const buttonText = getByText("Confirmar");

    expect(buttonElement).toBeInTheDocument();
    expect(buttonText).toBeInTheDocument();
  });
  it(`should render 'Carregando...' text when isLoading was passed`, () => {
    render(<Button isLoading>Confirmar</Button>);

    const isLoadingText = screen.getByText("Carregando...");

    expect(isLoadingText).toBeInTheDocument();
  });
});
