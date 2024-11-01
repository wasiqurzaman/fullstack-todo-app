import useTodo from "../contexts/TodoContext";

export default function Todos() {
  const { tasks } = useTodo();

  console.log(tasks);

  return (
    <div>
      <ul>
        {tasks?.map(task => (
          <li key={task._id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}
