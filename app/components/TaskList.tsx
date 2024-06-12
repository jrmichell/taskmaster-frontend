"use client";

import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import { Task, TaskStatus } from "../interfaces/Task";
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

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div className="flex justify-center items-center flex-col">
      <TaskForm onTaskAdded={fetchTasks} />
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onStatusChange={handleStatusChange}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;