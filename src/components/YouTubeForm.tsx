import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import styles from "./YouTubeForm.module.css";

type FormData = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
};

const YouTubeForm = () => {
  // Setting default values getting from the API response
  // const form = useForm<FormData>({
  //   defaultValues: async () => {
  //     const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
  //     const data = await res.json();
  //     return {
  //       username: "Batman",
  //       email: data.email,
  //       channel: data.name,
  //     };
  //   },
  // });
  const form = useForm<FormData>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
    },
  });
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  // Instead of doing this for each field spread the register prop
  // const { name, ref, onChange, onBlur } = register("username");

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const onSubmit = (data: FormData) => {
    console.log("RB:: Form Submitted", data);
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
              required: "Email is Required",
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

        <div className={styles.formField}>
          <label className={styles.label} htmlFor="social.twitter">
            Twitter
          </label>
          <input
            type="text"
            id="social.twitter"
            className={styles.input}
            {...register("social.twitter", {
              required: "Twitter is Required",
            })}
          />
          <p className={styles.alert}>{errors?.social?.twitter?.message}</p>
        </div>

        <div className={styles.formField}>
          <label className={styles.label} htmlFor="social.facebook">
            Facebook
          </label>
          <input
            type="text"
            id="social.facebook"
            className={styles.input}
            {...register("social.facebook", {
              required: "Facebook is Required",
            })}
          />
          <p className={styles.alert}>{errors?.social?.facebook?.message}</p>
        </div>

        <div className={styles.formField}>
          <label className={styles.label} htmlFor="phoneNumbers.0">
            Primary Phone Number
          </label>
          <input
            type="text"
            id="phoneNumbers.0"
            className={styles.input}
            {...register("phoneNumbers.0", {
              required: "Primary Phone number is required",
            })}
          />
          <p className={styles.alert}>{errors?.phoneNumbers?.[0]?.message}</p>
        </div>

        <div className={styles.formField}>
          <label className={styles.label} htmlFor="phoneNumbers.1">
            Secondary Phone Number
          </label>
          <input
            type="text"
            id="phoneNumbers.1"
            className={styles.input}
            {...register("phoneNumbers.1", {
              required: "Secondary Phone number is required",
            })}
          />
          <p className={styles.alert}>{errors?.phoneNumbers?.[1]?.message}</p>
        </div>

        <div>
          <label className={styles.label}>List of Phone Numbers</label>
          <div>
            {fields.map((field, index) => {
              return (
                <div className={styles.formField} key={field.id}>
                  <div className={styles.phNumber}>
                    <input
                      type="text"
                      className={styles.input}
                      {...register(`phNumbers.${index}.number` as const)}
                    />
                    {index > 0 && (
                      <button type="button" onClick={() => remove(index)}>
                        -
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
            <button type="button" onClick={() => append({ number: "" })}>
              +
            </button>
          </div>

          <p className={styles.alert}>{errors?.phoneNumbers?.[1]?.message}</p>
        </div>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YouTubeForm;
