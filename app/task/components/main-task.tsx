"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import FormTask from "./form-task";
import ListTask from "./list-task";
export interface ITask {
  id: string;
  title: string;
  isCompleted: boolean;
}
const MainTask = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  return (
    <div className="w-4/5 sm:w-[400px] space-y-7">
      <Card>
        <CardHeader>
          <CardTitle>Smart Tasks</CardTitle>
          <CardDescription>Gerencie sua tarefas</CardDescription>
        </CardHeader>
        <CardContent>
          <FormTask setTasks={setTasks} />
        </CardContent>
      </Card>
      {tasks.length > 0 && <ListTask tasks={tasks} setTasks={setTasks} />}
    </div>
  );
};

export default MainTask;
