import { useForm } from "react-hook-form";
import styles from "./TaskForm.module.css";
// import { format } from "date-fns";
import { FaXmark } from "react-icons/fa6";

export default function TaskForm({ mode }) {
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
      <div className={styles.header}>
        <h2 className={styles.h2}>Task:</h2>
        <FaXmark size={"2.4rem"} className={styles.closeBtn} />
      </div>
      <div className={styles.titleDiv}>
        <input
          className={`${styles.input} ${styles.title}`}
          type="text"
          placeholder="Title"
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
        <textarea
          className={`${styles.input} ${styles.description}`}
          id="description"
          type="text"
          placeholder="Description"
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
          className={`${styles.input} ${styles.priority}`}
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
          className={`${styles.input} ${styles.dueDate}`}
          type="date"
          id="dueDate"
          value={`${new Date().toDateString()}`}
          min={new Date().getDate()}
          {...register("dueDate", {
            valueAsDate: true,
            required: { value: true, message: "Due date is required." },
          })}
          defaultValue={new Date().toDateString()}
          name="dueDate"
        />
        {errors.dueDate && (
          <p className={styles.error}>{errors.dueDate?.message}</p>
        )}
      </div>

      <div className={styles.formRowlast}>
        {mode === "edit" && (
          <button className={`${styles.btn} ${styles.btnDelete}`} type="submit">
            Delete Task
          </button>
        )}
        <button className={styles.btn} type="submit">
          {mode === "create" || !mode ? " Add Task" : "Save changes"}
        </button>
      </div>
    </form>
  );
}
