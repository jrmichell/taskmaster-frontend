export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export enum TaskStatus {
  NOT_STARTED = "not_started",
  IN_PROGRESS = "in_progress",
  COMPLETE = "complete",
  DELETED = "deleted",
}

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  deleteTask?: (id: number) => void;
  createTask?: (
    id: number,
    title: string,
    status: TaskStatus,
    priority: TaskPriority,
  ) => Task;
}
