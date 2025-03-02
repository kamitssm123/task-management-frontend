import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";

import "./TaskTable.style.css";
import TaskForm from "../TaskForm";
import Table from "../../../components/Table";
import { Row } from "../../../components/Table/types";
import IconButton from "../../../components/IconButton";
import { formatDate, getHoursBetween } from "../../../utils/timeUtils";
import FORM_CONFIG, { getInitialFormData } from "../../../constants/formConfig";
import { useTasks } from "../../../contexts/TasksContext";
import { Task } from "../../../types/types";
import { updateTask } from "../../../services/api";

interface TaskTableProps {
  renderSelectAll: (id: string) => React.ReactNode;
  renderCheckbox: (id: string) => React.ReactNode;
  tasks: Record<string, any>[];
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, renderSelectAll, renderCheckbox }) => {
  const [editTaskOpen, setEditTaskOpen] = useState<boolean>(false);
  const { setTaskData } = useTasks();
  const [id, setId] = useState<number>(0)

  const itemToEditRef = useRef({});

  const onEditClick = useCallback(
    (index: number) => {
      const selectedTask = tasks.filter((task)=>task.id==index)
      const item = selectedTask[0];
      itemToEditRef.current = item;
      setEditTaskOpen(true);
      setId(index)
    },
    [id, tasks]
  );

  const renderEdit = useCallback(
    (index: number) => {
      return <IconButton IconComponent={MdEdit} onClick={() => onEditClick(index)} />;
    },
    [onEditClick]
  );

  const data = useMemo(() => {
    return tasks.map((task) => {
      const taskArray: Row = [
        renderCheckbox,
        task.id.toString(),
        task.title,
        task.priority.toString(),
        task.status,
        formatDate(task.start_time),
        formatDate(task.end_time),
        getHoursBetween(task.start_time, task.end_time).toString(),
        renderEdit,
      ];
      return taskArray;
    });
  }, [tasks, renderEdit, renderCheckbox]);

  const tableConfig = useMemo(
    () => ({
      header: [
        renderSelectAll,
        "Task ID",
        "Title",
        "Priority",
        "Status",
        "Start time",
        "End time",
        "Total time to finish (hrs)",
        "Edit",
      ] as Row,
      data: data,
    }),
    [data, renderSelectAll]
  );

  const handleEditTaskOnSubmit = useCallback(
    async (id: number, formState: Record<string, any>) => {
      const { title, start_date, end_date } = formState;
      if (!title || !start_date || !end_date) {
        alert("Title, Start Date, and End Date are required!");
        return;
      }
      setEditTaskOpen(false);
      const updatedTask: Task = await updateTask(id, formState);
      setTaskData((prevData) => prevData.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    },
    [setTaskData]
  );

  useEffect(() => {
    if (!editTaskOpen) {
      itemToEditRef.current = {};
    }
  }, [editTaskOpen]);

  return (
    <div>
      <div className="table-wrapper">
        <Table header={tableConfig.header} data={tableConfig.data} coloredRows={false} idColumnIndex={1} />
      </div>
      {editTaskOpen && (
        <TaskForm
          title="Edit task"
          formConfig={FORM_CONFIG}
          isOpen={editTaskOpen}
          setIsOpen={setEditTaskOpen}
          submitLabel="Update"
          onSubmit={(formState) => handleEditTaskOnSubmit(id, formState)}
          initialFormData={getInitialFormData(itemToEditRef.current)}
        />
      )}
    </div>
  );
};

export default React.memo(TaskTable);
