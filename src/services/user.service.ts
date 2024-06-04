import userModel, {
  EditUserInput,
  SigninUserInputs,
  UserInput,
} from "../models/user.model";

interface getUsersOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

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

export async function getusers(options: getUsersOptions) {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "asc",
    } = options;

    const skip = (page - 1) * limit;

    const users = await userModel
      .find()
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);

    const totalUsers = await userModel.countDocuments();

    return {
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    };
    
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
