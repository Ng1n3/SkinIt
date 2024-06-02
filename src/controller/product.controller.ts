import { Request, Response } from "express";
import {
  CreateProductInput,
  UpdateProductInput,
} from "../schemas/product.schema";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../services/product.service";

export async function createproductHandler(
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) {
  try {
    const product = await createProduct(req.body);
    res.status(200).send(product);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}

export async function getProductsHandlers(req: Request, res: Response) {
  try {
    const products = await getProducts();
    res.status(200).send(products);
  } catch (error: any) {
    res.status(404).send(error.message);
  }
}

export async function getProductHandler(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const product = await getProduct(req.params.id);
    res.status(200).send(product);
  } catch (error: any) {
    res.status(404).send(error.message);
  }
}

export async function updateProductHandler(
  req: Request<{ id: string }, {}, UpdateProductInput["body"]>,
  res: Response
) {
  try {
    const user = await updateProduct(req.params.id, req.body);
    res.status(200).send(user);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}

export async function deleteProductHandler(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const product = await deleteProduct(req.params.id);
    res.send(200).send({
      status: "OK",
      message: "product deleted",
      product
    });
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}
