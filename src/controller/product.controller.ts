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
import Logger from "../utils/logger";
import redisClient from "../utils/redisClient";
import { AuthenticatedRequest } from "../middleware/auth.check.middleware";
import logger from "../utils/logger";

const DEFAULT_EXPIRATION = Number(process.env.CACHING_DEFAULT_EXPIRATION);

export async function createproductHandler(
  req: AuthenticatedRequest<CreateProductInput["body"]>,
  res: Response
) {
  try {
    const { name, genre, price, description, units } = req.body;
    const seller = req.userId!;
    const product = await createProduct({
      seller,
      name,
      genre,
      price,
      description,
      units,
    });
    res.status(201).send(product);
  } catch (error: any) {
    logger.error(error.message);
    res.status(400).send(error.message);
  }
}

export async function getProductsHandlers(req: Request, res: Response) {
  try {
    const { page, limit, sortBy, sortOrder } = req.query;
    const options = {
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      sortBy: sortBy as string,
      sortOrder: sortOrder as "asc" | "desc",
    };
    const products = await getProducts(options);
    if (res.locals.cacheKey) {
      await redisClient.set(res.locals.cacheKey, JSON.stringify(products), {
        EX: DEFAULT_EXPIRATION,
      });
    }
    res.status(200).send(products);
  } catch (error: any) {
    Logger.error(error.message);
    res.status(404).send(error.message);
  }
}

export async function getProductHandler(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const product = await getProduct(req.params.id);

    if (res.locals.cacheKey) {
      await redisClient.set(res.locals.cacheKey, JSON.stringify(product), {
        EX: DEFAULT_EXPIRATION,
      });
    }
    res.status(200).send(product);
  } catch (error: any) {
    logger.error(error.message);
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
    logger.error(error.message);
    res.status(400).send(error.message);
  }
}

export async function deleteProductHandler(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const product = await deleteProduct(req.params.id);
    res.send(204).send({
      status: "OK",
      message: "product deleted",
      product,
    });
  } catch (error: any) {
    logger.error(error.message);
    res.status(400).send(error.message);
  }
}
