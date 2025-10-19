"use client";

import { useCallback, useEffect, useState } from "react";
import Task from "./components/Task";
import { createTask, getTasks } from "./api/api";
import { TaskProp } from "@types-project/mainTypes";

const Home = () => {
  const [tasks, setTasks] = useState<TaskProp[]>([]);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);

  useEffect(() => {
    const initTasks = async () => {
      const response = await getTasks();

      if (response.success) {
        setTasks(response.data!);
      }
    };
    initTasks();
  }, []);

  const handleCreateTask = useCallback(async () => {
    await createTask("Title", "Description");
    const response = await getTasks();

    if (response.success) {
      setTasks(response.data!);
      setEditTaskId(response.data![0].id || null);
    }
  }, []);

  return (
    <>
      <main>
        <div className="buttons">
          <button className="button button-create" onClick={handleCreateTask}>
            Create task
          </button>
        </div>
        <div className="content">
          {tasks.map((task) => (
            <Task
              editTaskId={editTaskId}
              setTasks={setTasks}
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              createdAt={task.createdAt}
            />
          ))}
        </div>
      </main>
      <footer>Made with ❤️ from Podval</footer>
    </>
  );
};

export default Home;
