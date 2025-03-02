import _orderBy from "lodash/orderBy";
import { FaPlus } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { BiSortAlt2 } from "react-icons/bi";
import { FaAngleDown } from "react-icons/fa";
import React, { useCallback, useState, useEffect, useMemo } from "react";

import "./TaskList.style.css";
import TaskForm from "./TaskForm";
import TaskTable from "./TaskTable";
import useSelection from "./TaskTable/hooks/useSelection";
import PrimaryButton from "../../components/PrimaryButton";
import FORM_CONFIG, { getInitialFormData } from "../../constants/formConfig";
import Dropdown from "../../components/Dropdown";
import { createTask, getTasks, deleteTask } from "../../services/api";
import { Task, TaskResponse } from "../../types/types";
import { useTasks } from "../../contexts/TasksContext";

const TaskList: React.FC = () => {
  const [addTaskOpen, setAddTaskOpen] = useState<boolean>(false);
  const { taskData, setTaskData } = useTasks();
  const { renderSelectAll, renderCheckbox, selectedIds } = useSelection(taskData);
  const [sortOption, setSortOption] = useState<string>("");
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const isSelected = !!selectedIds.length;

  const fetchTaskData = useCallback(async () => {
    try {
      const result: TaskResponse = await getTasks();
      setTaskData(result.tasks);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  }, [setTaskData]);

  useEffect(() => {
    fetchTaskData();
  }, [fetchTaskData]);

  const handleAddTask = useCallback(() => {
    setAddTaskOpen(true);
  }, []);

  const handleDeleteSelected = useCallback(async () => {
    console.log(selectedIds)
    const ids:string[] = await deleteTask(selectedIds)
    console.log(ids)
    if (Array.isArray(ids)) {
      setTaskData((prevData) => prevData.filter((task) => !ids.includes(task.id.toString())));
  } else {
      console.error('deleteTask returned an invalid response:', ids);
  }
  }, [selectedIds]);

  const handleAddTaskOnSubmit = useCallback(
    async (formState: Record<string, any>) => {
      const response: Task = await createTask(
        formState as {
          title: string;
          priority: number;
          status: string;
          start_time: Date;
          end_time: Date;
        }
      );

      console.log(response);
      setTaskData((prevTasks) => [...prevTasks, response]);
      setAddTaskOpen(false);
    },
    [setTaskData]
  );

  const onSortChange = (option: string) => {
    setSortOption(option);
  };

  const sortedTaskData = useMemo(() => {
    let filteredData = taskData;

    if (selectedPriority) {
      filteredData = filteredData.filter((task) => String(task.priority) === selectedPriority);
    }
    if (selectedStatus) {
      filteredData = filteredData.filter((task) => task.status === selectedStatus);
    }
    if (!sortOption) return filteredData;

    const [key, order] = sortOption.includes("Start time")
      ? ["start_time", sortOption.includes("ASC") ? "asc" : "desc"]
      : ["end_time", sortOption.includes("ASC") ? "asc" : "desc"];

    return _orderBy(filteredData, [key], [order as "asc" | "desc"]);
  }, [taskData, sortOption, selectedPriority, selectedStatus]);

  const onPriorityChange = useCallback((priority: string) => {
    setSelectedPriority(priority);
  }, []);

  const onStatusChange = useCallback((status: string) => {
    setSelectedStatus(status);
  }, []);

  return (
    <div>
      <h2 className="primary-header">Task List</h2>
      <div className="actions-row">
        <div className="sub-actions-row">
          <PrimaryButton label="Add task" onClick={handleAddTask} invertColors IconComponent={FaPlus} />
          <PrimaryButton
            label="Delete selected"
            onClick={handleDeleteSelected}
            invertColors
            primaryColor={"#dc3545"}
            IconComponent={FaTrashAlt}
            disabled={!isSelected}
          />
        </div>
        <div className="sub-actions-row">
          <Dropdown
            label="Sort"
            options={["Start time: ASC", "Start time: DESC", "End time: ASC", "End time: DESC"]}
            removeLabel="Remove sort"
            onSelect={onSortChange}
            onRemove={() => onSortChange("")}
            LeftIcon={BiSortAlt2}
          />
          <Dropdown
            label="Priority"
            options={["1", "2", "3", "4", "5"]}
            onSelect={onPriorityChange}
            onRemove={() => onPriorityChange("")}
            RightIcon={FaAngleDown}
          />
          <Dropdown
            label="Status"
            options={["Pending", "Completed"]}
            onSelect={onStatusChange}
            onRemove={() => onStatusChange("")}
            RightIcon={FaAngleDown}
          />
        </div>
      </div>
      <TaskTable renderSelectAll={renderSelectAll} renderCheckbox={renderCheckbox} tasks={sortedTaskData} />
      {addTaskOpen && (
        <TaskForm
          title="Add new task"
          formConfig={FORM_CONFIG}
          isOpen={addTaskOpen}
          setIsOpen={setAddTaskOpen}
          submitLabel="Add task"
          onSubmit={handleAddTaskOnSubmit}
          initialFormData={getInitialFormData()}
        />
      )}
    </div>
  );
};

export default React.memo(TaskList);
