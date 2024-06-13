import supertest from "supertest";
import createServer from "../utils/server";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { connectRedis, disConnectRedis } from "../utils/redisClient";
import { createProduct } from "../services/product.service";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

export const userPayLoad = {
  _id: userId,
  name: "Emmmanuel",
  email: "emmanuel2@gmail.com",
};

export const user = {
  name: "tom",
  password: "123456",
  email: "tom@gmail.com",
};

export const productPayload = {
  name: "iPhone 12 Pro max 128GB",
  description: "An iphone for everybody",
  genre: ["phone", "electronics"],
  units: "5",
  price: "635000",
  seller: "666887946fd6318e07b8a815",
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

        await supertest(app).get(`/api/v1/product/${productId}`).expect(404);
      });
    });

    describe("given the product does exist ", () => {
      it("should return a 200 status and the product", async () => {
        const product = await createProduct(productPayload);
        const productID = product._id?.toString();

        console.log("product: ", productID);
        const { body, statusCode } = await supertest(app)
          .get(`/api/v1/product/${productID}`)
          .expect(200);

        expect(statusCode).toBe(200);
        expect(body._id).toBe(productID);
      });
    });
  });

  describe("create product route", () => {
    describe("given the user is not logged in", () => {
      it("should be a 403", async () => {
        const { statusCode } = await supertest(app).post(
          "/api/v1/product-create"
        );

        expect(statusCode).toBe(403);
      });
    });

    describe("given the user wants to signup", () => {
      it("should be a 201 and create the product", async () => {
        const signupResponse = await supertest(app)
          .post("/api/v1/signup")
          .send(user);

        expect(signupResponse.statusCode).toBe(201);

        const { access_Token } = signupResponse.body;

        const productResponse = await supertest(app)
          .post("/api/v1/product-create")
          .set("Authorization", `Bearer ${access_Token}`)
          .send(productPayload);

          console.log("product Response: ", productResponse)
        expect(productResponse.statusCode).toBe(201);
        expect(productResponse.body).toEqual({
          _id: expect.any(String),
          name: "iPhone 12 Pro max 128GB",
          description: "An iphone for everybody",
          genre: ["phone", "electronics"],
          units: "5",
          price: "635000",
          seller: expect.any(String),
        });
      });
    });
  });
});
