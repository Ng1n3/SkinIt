import { Router } from "express";
import validateProduct from "../middleware/validate.product";
import { createProductSchema } from "../schemas/product.schema";
import { createUserHandler } from "../controller/users.controller";
import { createproductHandler, deleteProductHandler, getProductHandler, getProductsHandlers, updateProductHandler } from "../controller/product.controller";

const productRouter = Router()

productRouter.post("/product-create", validateProduct(createProductSchema), createproductHandler);

productRouter.get("/products", getProductsHandlers);

productRouter.get("/product/:id", getProductHandler);

productRouter.put("/product/:id", updateProductHandler);

productRouter.delete("/product/:id", deleteProductHandler);

export default productRouter;