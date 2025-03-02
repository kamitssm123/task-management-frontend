import React, { createContext, Dispatch, SetStateAction, useContext, useMemo, useState } from "react";

import { Task } from "../types/types";

interface TasksContextType {
  taskData: Task[];
  setTaskData: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [taskData, setTaskData] = useState<Task[]>([]);

  const contextValue = useMemo(() => ({ taskData, setTaskData }), [taskData]);

  return <TasksContext.Provider value={contextValue}>{children}</TasksContext.Provider>;
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) throw new Error("useTasks must be used within an TasksProvider");
  return context;
};
