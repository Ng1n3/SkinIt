import userModel, {
  EditUserInput,
  SigninUserInputs,
  UserInput,
} from "../models/user.model";



export async function createUser(input: UserInput) {
  try {
    const checkUser = await userModel.findOne({ email: input.email });
    if (checkUser)
      throw new Error("User already exists, please login or use another email");
    const user = await userModel.create(input);
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function signin(input: SigninUserInputs) {
  try {
    const user = await userModel.findOne({ email: input.email });
    if (!user) throw new Error("user does not exist");
    const isValid = await user.comparePassword(input.password);
    if (!isValid) throw new Error("password incorrect");
    return user;
  } catch (error: any) {
    throw new Error(error.message);
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

export async function deleteUser(id: string) {
  try {
    await userModel.findByIdAndDelete(id);
  } catch (error: any) {
    throw new Error(error.message);
  }
}
