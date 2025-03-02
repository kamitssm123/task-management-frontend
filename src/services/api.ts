import { TOKEN } from "../constants/storageKeys";
import storage from "../utils/storageUtils";
import { TaskResponse, Task } from "../types/types";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://task-management-backend-api-gateway.onrender.com';



interface LoginResponse {
    token: string;
    user: {
      id: number;
      username: string;
      email: string;
    };
  }

  interface TaskMetrics {
    total_tasks: string;
    completed_percentage: string;
    pending_percentage: string;
    avg_time_per_completed_task: string;
    pending_tasks: string;
    total_time_lapsed: string;
    total_time_to_finish: string;
  }
  
  interface TopTask {
    "Task priority": number;
    "Pending tasks": string;
    "Time lapsed (hrs)": string;
    "Time to finish (hrs)": string;
  }
  
  interface DashboardResponse {
    taskMetrics: TaskMetrics;
    topTasks: TopTask[];
  }

export const loginApi = async (credentials: { email: string; password: string }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) {
        throw new Error(`Login failed: ${response.statusText}`);
      }
  
      const data:LoginResponse = await response.json();
  
      return data;
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  };

const fetchAPI = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    console.log("Inside fetch API");
  const token = storage.get(TOKEN) // Retrieve token from localStorage
  console.log("Token is", token)

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '', // Attach token if available
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} - ${response.statusText}`);
  }

  return response.json();
};

export const getTasks = async () => {
    const data: TaskResponse = await fetchAPI('/tasks');
    console.log(data)
    return data;
};

export const getDashboardStat = async () => {
    console.log("Inside getDashboardStat")
    const data:DashboardResponse = await fetchAPI('/tasks/dashboard');
    return data;
}

// Example: Create task with token
export const createTask = async (taskData: { title: string; priority: number;status:string; start_time:Date;end_time:Date }) => {
    const data:Task = await fetchAPI('/tasks', { method: 'POST', body: JSON.stringify(taskData) });
    return data;
};

export const deleteTask = async(ids: string[]) => {
    const data:string[] = await fetchAPI('/tasks', {method: 'DELETE', body: JSON.stringify(ids)})
    return data;
}

// Example: Logout user (clearing the token)
export const logoutUser = () => {
  localStorage.removeItem('TOKEN');
};

export const updateTask = async (id: number, updatedTaskData: { 
    title?: string; 
    priority?: number; 
    status?: string; 
    start_time?: Date; 
    end_time?: Date 
}) => {
    const data: Task = await fetchAPI(`/tasks/${id}`, { 
        method: 'PUT', 
        body: JSON.stringify(updatedTaskData) 
    });
    return data;
};
