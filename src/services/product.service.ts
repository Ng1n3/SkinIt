import productModel, {
  ProductDocument,
  ProductInput,
  editProductInput,
} from "../models/product.model";
import Logger from "../utils/logger";

interface getProductOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export async function createProduct(
  input: ProductInput
): Promise<ProductDocument> {
  try {
    const product = await productModel.create(input);
    return product;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getProducts(options: getProductOptions) {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "asc",
    } = options;

    const skip = (page - 1) * limit;
    const products = await productModel
      .find()
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);

    const totalProducts = await productModel.countDocuments();
    return {
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getProduct(id: string) {
  try {
    const product = await productModel.findById(id);
    if (!product) throw new Error("product not found");
    return product;
  } catch (error: any) {
    Logger.error(error.message);
    throw new Error("Resource does not exist 🥲");
  }
}

export async function updateProduct(id: string, input: editProductInput) {
  try {
    const checkProduct = await productModel.findById(id);
    if (!checkProduct) throw new Error("product not found");
    const product = await productModel.findByIdAndUpdate(id, input);
    return product;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function deleteProduct(id: string) {
  try {
    await productModel.findByIdAndDelete(id);
  } catch (error: any) {
    throw new Error(error.message);
  }
}
