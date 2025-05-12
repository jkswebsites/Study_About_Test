import React from "react";
type ButtonProps = {
  children: React.ReactNode;
  isLoading?: boolean;
};
const Button = ({ children, isLoading }: ButtonProps) => {
  return <button>{isLoading ? "Carregando..." : children}</button>;
};

export default Button;
