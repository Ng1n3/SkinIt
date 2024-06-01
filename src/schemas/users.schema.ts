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

export const signinUserSchema = object({
  body: object({
    email: string({
      required_error: "please enter your email"
    }).email("enter a valid email"),
    password: string({
      required_error: 'Enter your password'
    }).min(6, 'password too short - 6 minimum characters needed')
  })
})

export const editUserSchema = object({
  body: object({
    name: string().optional(),
    password: string()
      .min(6, "Password too short - 6 minimum characters needed")
      .optional(),
    email: string().email("enter a valid email").optional(),
  }),
});

export type CreateuserInput = TypeOf<typeof createUserSchema>;
export type EdituserInput = TypeOf<typeof editUserSchema>;
export type SignInUserInput = TypeOf<typeof signinUserSchema>;
