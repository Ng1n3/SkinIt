import productModel, {
  ProductInput,
  editProductInput,
} from "../models/product.model";

export async function createProduct(input: ProductInput) {
  try {
    const product = await productModel.create(input);
    return product;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getProducts() {
  try {
    const products = await productModel.find();
    return products;
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
    throw new Error(error.message);
  }
}

export async function updateProduct(id: string, input: editProductInput) {
  try {
    const checkProduct = await productModel.findById(id);
    if (!checkProduct) throw new Error("product not found");
    const product = await productModel.findByIdAndUpdate(id,input);
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
