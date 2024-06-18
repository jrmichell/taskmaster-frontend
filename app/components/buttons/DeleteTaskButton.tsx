import { Task } from "../interfaces/Task";
import { supabase } from "@/utils/supabase/client";

interface DeleteTaskProps {
  task: Task;
  onDelete: (id: number) => void;
}

const DeleteTask: React.FC<DeleteTaskProps> = ({ task, onDelete }) => {
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", task.id);

    if (error) {
      console.error("Error deleting task:", error);
    }

    onDelete(task.id);
  };

  return (
    <button onClick={handleDelete} className="p-1 border rounded-md">
      Delete
    </button>
  );
};

export default DeleteTask;
