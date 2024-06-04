import { Router } from "express";
import validateProduct from "../middleware/validate.product";
import { createProductSchema } from "../schemas/product.schema";
import { createUserHandler } from "../controller/users.controller";
import {
  createproductHandler,
  deleteProductHandler,
  getProductHandler,
  getProductsHandlers,
  updateProductHandler,
} from "../controller/product.controller";
import checkAuthentication from "../middleware/auth.check";
import cacheMiddleware from "../middleware/cache";

const productRouter = Router();

productRouter.post(
  "/product-create",
  checkAuthentication,
  validateProduct(createProductSchema),
  createproductHandler
);

productRouter.get(
  "/products",
  cacheMiddleware("products"),
  getProductsHandlers
);

productRouter.get(
  "/product/:id",
  cacheMiddleware("product"),
  getProductHandler
);

productRouter.put("/product/:id", checkAuthentication, updateProductHandler);

productRouter.delete("/product/:id", checkAuthentication, deleteProductHandler);

export default productRouter;
