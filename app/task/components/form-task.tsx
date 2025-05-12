"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ITask } from "./main-task";
import { v4 as uuidv4 } from "uuid";
//import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

const taskSchema = z.object({
  task: z
    .string({ message: "Este campo é obrigatório" })
    .min(6, { message: "Este campo deve conter ao menos 6 caracteres!" }),
});
type formTaskSchema = z.infer<typeof taskSchema>;
interface FormTaskProps {
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}
const FormTask = ({ setTasks }: FormTaskProps) => {
  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm<formTaskSchema>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit: SubmitHandler<formTaskSchema> = (data) => {
    setTasks((prevState) => [
      ...prevState,
      {
        title: data.task,
        isCompleted: false,
        id: uuidv4(),
      },
    ]);
    setValue("task", "");
  };

  return (
    <form className="sm:w-[400px]" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative">
        <label>
          <span>Tarefa:</span>
          <Input
            {...register("task")}
            type="text"
            className="w-[60%]"
            autoComplete="off"
            placeholder="escreva sua tarefa..."
          />
          <span
            className={`${
              errors.task ? "text-red-600" : "text-neutral-500"
            } float-right -mt-11 mr-32`}
          >
            *
          </span>
        </label>
        {errors.task && (
          <p className="text-red-600 text-sm">{errors.task.message}</p>
        )}
      </div>
      <Button className="w-4/5 mt-5">Add</Button>
    </form>
  );
};

export default FormTask;
