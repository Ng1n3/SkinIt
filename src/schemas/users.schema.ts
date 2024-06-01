import { TypeOf, object, string } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Please enter a name",
    }),
    password: string({
      required_error: "password is required",
    }).min(6, "password too short - 6 minimum characters needed"),
    email: string({
      required_error: "email required",
    }).email("enter a valid email"),
  }),
});

export type CreateuserInput = TypeOf<typeof createUserSchema>;
