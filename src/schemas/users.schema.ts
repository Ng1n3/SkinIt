import { TypeOf, object, string } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Please enter a name",
    }),
    password: string({
      required_error: "password is required",
    }).min(6, "password too short - 6 minimum characters needed"),
    passwordConfirmation: string({
      required_error: "password confirmation is required",
    }),
    email: string({
      required_error: "email required",
    }).email("enter a valid email"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

export const signinUserSchema = object({
  body: object({
    email: string({
      required_error: "please enter your email",
    }).email("enter a valid email"),
    password: string({
      required_error: "Enter your password",
    }).min(6, "password too short - 6 minimum characters needed"),
  }),
});

export const editUserSchema = object({
  body: object({
    name: string().optional(),
    password: string()
      .min(6, "Password too short - 6 minimum characters needed")
      .optional(),
    email: string().email("enter a valid email").optional(),
  }),
});

export const forgotPasswordEmailSchema = object({
  body: object({
    email: string({ required_error: "please enter an email" }).email(
      "enter a valid email"
    ),
  }),
});

export const resetPasswordSchema = object({
  body: object({
    token: string({ required_error: "Please enter your token" }),
    email: string({ required_error: "Please input your email" }).email(
      "please enter a correct email address"
    ),
    newPassword: string({
      required_error: "enter your new password",
    }).min(6, "Passoword too short - 6 minimum characters needed"),
  }),
});

export type CreateuserInput = TypeOf<typeof createUserSchema>;
export type EdituserInput = TypeOf<typeof editUserSchema>;
export type SignInUserInput = TypeOf<typeof signinUserSchema>;
export type ForgotPasswordEmailInput = TypeOf<typeof forgotPasswordEmailSchema>;
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;
