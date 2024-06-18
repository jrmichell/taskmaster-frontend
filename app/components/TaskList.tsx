"use client";

import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import DeleteTaskButton from "./buttons/DeleteTaskButton";
import UpdatePriorityButton from "./buttons/UpdatePriorityButton";
import { Task, TaskStatus, TaskPriority } from "../interfaces/Task";
import { supabase } from "../../utils/supabase/client";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data, error } = await supabase.from("tasks").select("*");

    if (error) {
      console.error("Error fetching tasks:", error);
    } else {
      setTasks(data as Task[]);
    }
    setLoading(false);
  };

  const handleStatusChange = async (id: number, newStatus: TaskStatus) => {
    const { data, error } = await supabase
      .from("tasks")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      console.error("Error updating task status:", error);
    } else {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, status: newStatus } : task,
        ),
      );
    }
  };

  const handleDelete = async (id: number) => {
    const { data, error } = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      console.error("Error deleting task:", error);
    } else {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const handlePriorityChange = async (
    id: number,
    newPriority: TaskPriority,
  ) => {
    const { data, error } = await supabase
      .from("tasks")
      .update({ priority: newPriority })
      .eq("id", id);

    if (error) {
      console.error("Error updating task priority:", error);
    } else {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, priority: newPriority } : task,
        ),
      );
    }
  };

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div className="flex justify-center items-center flex-col">
      <TaskForm onTaskAdded={fetchTasks} />
      {tasks.length === 0 ? (
        <p className="m-4">No tasks available.</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id}>
            <TaskItem task={task} onStatusChange={handleStatusChange} />
            <UpdatePriorityButton
              task={task}
              onPriorityChange={() =>
                handlePriorityChange(task.id, task.priority)
              }
            />
            <DeleteTaskButton task={task} onDelete={handleDelete} />
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
