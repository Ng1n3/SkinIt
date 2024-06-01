import userModel, { UserInput } from "../models/user.model";

export async function createUser(input: UserInput) {
  try {
    const user = await userModel.create(input);
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
}
