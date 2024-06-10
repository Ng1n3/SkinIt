import supertest from "supertest";
import createServer from "../utils/server";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { connectRedis, disConnectRedis } from "../utils/redisClient";
import { createProduct } from "../services/product.service";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

export const productPayload = {
  user: userId,
  name: "iPhone 12 Pro max 128GB",
  description: "An iphone for everybody",
  genre: ["phone", "electronics"],
  units: "5",
  price: "635000",
};

describe("product", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
    await connectRedis();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
    await disConnectRedis();
  });
  describe("get product route", () => {
    describe("given the product does not exist ", () => {
      it("should return a 404", async () => {
        const productId = "product-123";

        await supertest(app).get(`/api/products/${productId}`).expect(404);
      });
    });

    describe("given the product does exist ", () => {
      it("should return a 200 status and the product", async () => {
        const product = await createProduct(productPayload);
        const productId = "product-123";

        const { body, statusCode } = await supertest(app)
          .get(`/api/products/${product._id}`)
          .expect(200);

          expect(statusCode).toBe(200)
          expect(body._id).toBe(product._id)
      });
    });
  });
});
