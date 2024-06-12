export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export enum TaskStatus {
  NOT_STARTED = "not_started",
  IN_PROGRESS = "in_progress",
  COMPLETE = "complete",
}

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
}
