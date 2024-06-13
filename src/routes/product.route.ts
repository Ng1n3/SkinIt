import { Router } from "express";
import validateResource from "../middleware/validate.resource.middleware";
import { createProductSchema } from "../schemas/product.schema";

import {
  createproductHandler,
  deleteProductHandler,
  getProductHandler,
  getProductsHandlers,
  updateProductHandler,
} from "../controller/product.controller";
import checkAuthentication from "../middleware/auth.check.middleware";
import cacheMiddleware from "../middleware/cache.middleware";
import { checkRole } from "../middleware/auth.role.middleware";

const productRouter = Router();

productRouter.post(
  "/product-create",
  checkAuthentication,
  validateResource(createProductSchema),
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
  // checkAuthentication,
  getProductHandler
);

productRouter.put("/product/:id", checkAuthentication, updateProductHandler);

productRouter.delete(
  "/product/:id",
  checkAuthentication,
  checkRole("admin"),
  deleteProductHandler
);

export default productRouter;
