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
import { checkRole } from "../middleware/auth.role";

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
  checkAuthentication,
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
