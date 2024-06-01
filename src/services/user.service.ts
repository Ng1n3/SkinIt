import userModel, { EditUserInput, UserInput } from "../models/user.model";

export async function createUser(input: UserInput) {
  try {
    const user = await userModel.create(input);
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getusers() {
  try {
    const users = await userModel.find();
    return users;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getUser(id: string) {
  try {
    const user = await userModel.findById(id);
    if (!user) throw new Error("user not found");

    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function editUser(input: EditUserInput, id: string) {
  try {
    const userId = await userModel.findById(id);
    if (!userId) throw new Error("User not found");
    const user = await userModel.findByIdAndUpdate(id, input);
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function deleteUser(id:string) {
  try {
    await userModel.findByIdAndDelete(id);
  } catch (error:any) {
    throw new Error(error.message)
  }
}
