import { useForm } from "react-hook-form";
import styles from "../styles/TodoForm.module.css";

export default function TodoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      priority: "",
      dueDate: new Date(),
    },
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.h2}>Add New Task</h2>
      <div className={styles.titleDiv}>
        <label className={styles.label} htmlFor="">
          Title
        </label>
        <input
          className={`${styles.inp} ${styles.title}`}
          {...register("title", {
            minLength: {
              value: 5,
              message: "Title must be atleast 5 character long",
            },
            required: { value: true, message: "Title is required." },
          })}
        />
        {errors.title && (
          <p className={styles.error}>{errors.title?.message}</p>
        )}
      </div>
      <div>
        <label className={styles.label} htmlFor="description">
          Description
        </label>
        <textarea
          className={`${styles.inp} ${styles.description}`}
          id="description"
          {...register("description", {
            minLength: {
              value: 10,
              message: "Description must be atleast 10 character long",
            },
            required: { value: true, message: "Desscrption is required." },
          })}
        ></textarea>
        {errors.description && (
          <p className={styles.error}>{errors.description?.message}</p>
        )}
      </div>
      <div>
        <label className={styles.label} htmlFor="priority">
          Priority
        </label>
        <select
          className={`${styles.inp} ${styles.priority}`}
          {...register("priority", {
            required: { value: true, message: "Priority is required" },
          })}
          id="priority"
        >
          <option value="">Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
        {errors.priority && (
          <p className={styles.error}>{errors.priority?.message}</p>
        )}
      </div>
      <div>
        <label className={styles.label} htmlFor="Due Date">
          Due Date
        </label>
        <input
          className={`${styles.inp} ${styles.dueDate}`}
          type="date"
          id="dueDate"
          {...register("dueDate", {
            valueAsDate: true,
            required: { value: true, message: "Due date is required." },
          })}
          defaultValue={new Date().getDate()}
          name="dueDate"
        />
        {errors.dueDate && (
          <p className={styles.error}>{errors.dueDate?.message}</p>
        )}
      </div>

      <button className={styles.btn} type="submit">
        Add Task
      </button>
    </form>
  );
}
