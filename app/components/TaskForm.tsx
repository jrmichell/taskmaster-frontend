import { FormEventHandler, MouseEventHandler, useState } from "react";
import { TaskPriority, TaskStatus } from "../interfaces/Task";
import { supabase } from "@/utils/supabase/client";

const TaskForm: React.FC<{ onTaskAdded: () => void }> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const { data, error } = await supabase.from("tasks").insert([
      {
        title,
        priority,
        status: TaskStatus.NOT_STARTED,
      },
    ]);

    if (error) {
      console.error("Error adding task:", error);
    } else {
      setTitle("");
      setPriority(TaskPriority.MEDIUM);
      onTaskAdded();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center flex-col gap-8"
    >
      <div>
        <label>Title: </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border rounded-md"
        />
      </div>
      <div>
        <label>Priority: </label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
          className="p-1 rounded-md"
        >
          <option value={TaskPriority.LOW}>Low</option>
          <option value={TaskPriority.MEDIUM}>Medium</option>
          <option value={TaskPriority.HIGH}>High</option>
        </select>
      </div>
      <button type="submit" className="p-1 border rounded-md">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
