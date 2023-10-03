import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import styles from "./YouTubeForm.module.css";

type FormData = {
  username: string;
  email: string;
  channel: string;
};

const YouTubeForm = () => {
  const form = useForm<FormData>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  // Instead of doing this for each field spread the register prop
  // const { name, ref, onChange, onBlur } = register("username");

  const onSubmit = (data: FormData) => {
    console.log("Form Submitted", data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.formField}>
          <label className={styles.label} htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            className={styles.input}
            {...register("username", {
              required: { value: true, message: "Username is Required" },
            })}
          />
          <p className={styles.alert}>{errors?.username?.message}</p>
        </div>

        <div className={styles.formField}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className={styles.input}
            {...register("email", {
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid Email input",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" ||
                    "Enter a different email"
                  );
                },
                notBlacklisted: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "Domain not supported!"
                  );
                },
              },
            })}
          />
          <p className={styles.alert}>{errors?.email?.message}</p>
        </div>

        <div className={styles.formField}>
          <label className={styles.label} htmlFor="channel">
            Channel
          </label>
          <input
            type="text"
            id="channel"
            className={styles.input}
            {...register("channel", {
              required: "Channel is Required",
            })}
          />
          <p className={styles.alert}>{errors?.channel?.message}</p>
        </div>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YouTubeForm;
