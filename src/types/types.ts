export enum TaskStatus {
    Pending = "Pending",
    Completed = "Completed"
  }
  
export interface Task {
    id: number;
    title: string;
    priority: number;
    user_id: number;
    status: TaskStatus;
    start_time: Date;
    end_time: Date;
    created_at: string;
  }
  
export interface TaskResponse {
    page: number;
    limit: number;
    totalPages: number;
    totalTasks: number;
    tasks: Task[];
  }
  