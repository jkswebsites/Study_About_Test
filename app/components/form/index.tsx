import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FormTest = () => {
  return (
    <Card className="w-4/5 mx-auto sm:w-[400px]">
      <CardHeader>
        <CardTitle>Formulário</CardTitle>
        <CardDescription>Cadastre-se para usar o sistema.</CardDescription>
      </CardHeader>
      <CardContent>
        <form data-testid="form-register">
          <label className="inputContainer">
            <span>Username</span>
            <input type="text" placeholder="your username" />
          </label>

          <label className="inputContainer">
            <span>Password</span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="your password"
            />
          </label>

          <div className="mt-8">
            <button
              disabled
              className="buttonDefault  bg-green-500"
              type="submit"
            >
              Confirmar
            </button>
            <button className="buttonDefault bg-neutral-500" type="reset">
              Cancelar
            </button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-center w-full text-neutral-400 text-sm underline">
          More information...
        </p>
      </CardFooter>
    </Card>
  );
};

export default FormTest;
