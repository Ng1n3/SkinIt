import mongoose from "mongoose";
import * as userService from "../services/user.service";
import supertest from "supertest";
import createServer from "../utils/server";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
  user: {
    _id: userId,
    email: "emma@gmail.com",
    name: "emma",
  },
  success: true,
  access_Token: "access_token",
};

const userInput = {
  email: "emma@gmail.com",
  name: "emma",
  password: "password12345",
  passwordConfirmation: "password12345",
};

describe("user", () => {
  // User registration

  describe("user registration", () => {
    describe("given the username and password", () => {
      it("should return the user payload", async () => {
        const createUserServiceMock = jest
          .spyOn(userService, "createUser")
          .mockReturnValue({
            ...userPayload.user,
            save: jest.fn().mockResolvedValue(userPayload.user),
            generateAccessToken: jest.fn().mockReturnValue("access_token"),
            generateRefreshToken: jest.fn().mockReturnValue("refresh_token"),
          } as any);
        // .mockReturnValueOnce(userPayload);

        const { statusCode, body } = await supertest(app)
          .post("/api/v1/signup")
          .send(userInput);

        console.log("body", body);

        expect(statusCode).toBe(201);
        expect(body).toMatchObject({
          user: {
            _id: userPayload.user._id,
            email: userPayload.user.email,
            name: userPayload.user.name,
          },
          success: true,
          access_Token: "access_token",
        });
        expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
      });

      describe("given the passwords do not match", () => {
        it("should return a 400", async () => {
          const invalidUserInput = {
            ...userInput,
            passwordConfirmation: "new password",
          };

          const { statusCode } = await supertest(app)
            .post("/api/v1/signup")
            .send(invalidUserInput);

          expect(statusCode).toBe(400);
        });
      });

      describe("given the user service throws", () => {
        it("should handle a 400 error", async () => {
          const createUserServiceMock = jest
            .spyOn(userService, "createUser")
            .mockRejectedValue(new Error("Error creating user"));

          const { statusCode, body } = await supertest(app)
            .post("/api/v1/signup")
            .send(userInput);

          console.log("body", body);

          expect(statusCode).toBe(400);
          // expect(body).toMatchObject({ message: "Error creating user" });
          expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
        });
      });
    });
  });
});
