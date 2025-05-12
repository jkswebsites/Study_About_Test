"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormInput {
  name: string;
  lastName: string;
}

const FormTDD = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>({
    defaultValues: {
      name: "",
      lastName: "",
    },
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data);
  };
  return (
    <div className="w-[400px] min-h-[300px] p-2 flex flex-col gap-y-3 border rounded-md">
      <h2 className="text-center text-2xl text-emerald-300 font-medium">
        Form TDD
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div>
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="Nome"
            className="border w-4/5 p-2 rounded-md placeholder:text-zinc-200"
          />
          {errors.name?.type === "required" && (
            <p className="text-xs text-red-600">Campo nome é obrigatório!</p>
          )}
        </div>

        <div>
          <input
            type="text"
            {...register("lastName", { required: true })}
            placeholder="Sobrenome"
            className="border w-4/5 p-2 rounded-md placeholder:text-zinc-200"
          />
          {errors.lastName?.type === "required" && (
            <p className="text-xs text-red-600">
              Campo sobrenome é obrigatório!
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-emerald-500  rounded-md text-white py-2 hover:bg-emerald-300"
        >
          {!isSubmitting ? <span>Enviar</span> : <span>Enviando...</span>}
        </button>
      </form>
    </div>
  );
};

export default FormTDD;
