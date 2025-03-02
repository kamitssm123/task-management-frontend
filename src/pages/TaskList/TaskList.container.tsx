import React from "react";
import { TasksProvider } from "../../contexts/TasksContext";
import TaskList from "./TaskList";

const TaskListContainer: React.FC = () => {
  return (
    <TasksProvider>
      <TaskList />
    </TasksProvider>
  );
};

export default React.memo(TaskListContainer);
