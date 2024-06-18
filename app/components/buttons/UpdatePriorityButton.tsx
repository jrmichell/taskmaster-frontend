import { supabase } from "@/utils/supabase/client";
import { Task, TaskPriority } from "../../interfaces/Task";

interface UpdatePriorityButtonProps {
  task: Task;
  onPriorityChange: (priority: TaskPriority) => void;
}

const UpdatePriorityButton: React.FC<UpdatePriorityButtonProps> = ({
  task: { id, priority },
  onPriorityChange,
}) => {
  const handlePriorityChange = async (newPriority: string) => {
    const { data, error } = await supabase
      .from("tasks")
      .update({ priority: newPriority })
      .eq("id", id);

    if (error) {
      console.error("Error updating task priority:", error);
    }
  };

  return (
    <>
      <label>Priority: </label>
      <select
        onChange={(e) => handlePriorityChange(e.target.value)}
        defaultValue={priority}
        className="p-1 rounded-md"
      >
        <option value={TaskPriority.LOW}>Low</option>
        <option value={TaskPriority.MEDIUM}>Medium</option>
        <option value={TaskPriority.HIGH}>High</option>
      </select>
    </>
  );
};

export default UpdatePriorityButton;
