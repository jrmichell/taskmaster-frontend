import { Task, TaskStatus } from "../interfaces/Task";

interface TaskItemProps {
  task: Task;
  onStatusChange: (id: number, newStatus: TaskStatus) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onStatusChange }) => {
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(task.id, event.target.value as TaskStatus);
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <h1>{task.title} </h1>
        <p>
          Status:
          <select value={task.status} onChange={handleStatusChange}>
            <option value={TaskStatus.NOT_STARTED}>Not Started</option>
            <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
            <option value={TaskStatus.COMPLETE}>Completed</option>
          </select>
        </p>
      </div>
    </>
  );
};

export default TaskItem;
