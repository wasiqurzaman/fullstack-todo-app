import { useEffect, useState } from "react";
import { getAllTasks, setToken } from "../services/todos";

export default function Todos() {
  const [tasks, setTasks] = useState([]);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Indhc2lxdXIiLCJpZCI6IjY3MjE1NGY4OGZkMDk2MzZlOGMzNDljMiIsImlhdCI6MTczMDMyOTEyMCwiZXhwIjoxNzMwMzMwOTIwfQ.NRs9hqFFM2pRn8wO6MZlLuixgfyZ3emylx912znLQqw";

  useEffect(() => {
    setToken(token);
    (async () => {
      const tasks = await getAllTasks();
      setTasks(tasks);
    })();
  }, []);

  console.log(tasks);

  return (
    <div>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
