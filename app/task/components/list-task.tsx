import { Button } from "@/components/ui/button";
import React from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import { ITask } from "./main-task";
interface ListTaskProps {
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}
const ListTask = ({ tasks, setTasks }: ListTaskProps) => {
  const handleDeleteClick = (id: string) => {
    setTasks((prevTask) => prevTask.filter((task) => task.id !== id));
  };
  const handleIsCompletedClick = (id: string) => {
    setTasks((prevTask) =>
      prevTask.map((task) => {
        if (task.id === id && task.isCompleted === false) {
          return { ...task, isCompleted: true };
        }
        if (task.id === id && task.isCompleted === true) {
          return { ...task, isCompleted: false };
        }
        return task;
      })
    );
  };

  return (
    <div className="w-4/5 sm:w-[400px] mx-auto">
      <h2 className="font-bold">Lista de Tarefas</h2>

      <ul className="mt-4 [&>li]:p-4 [&>li]:border-b">
        {tasks.length > 0 &&
          tasks.map((task, index) => (
            <li key={task.id} className="flex items-center justify-between">
              <span className={`${task.isCompleted && "line-through"}`}>
                {task.title}
              </span>
              <div className="space-x-1">
                <Button
                  data-testid={`isComplete-${index}`}
                  onClick={() => handleIsCompletedClick(task.id)}
                  variant={"default"}
                >
                  ✔️
                </Button>
                <Button
                  onClick={() => handleDeleteClick(task.id)}
                  data-testid={`delete-${index}`}
                  variant={"destructive"}
                  aria-label="delete-btn"
                >
                  <MdOutlineDeleteForever />
                </Button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ListTask;
