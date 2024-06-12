# API DOCUMENTATION

### REST API

This project is a rest API built with a robust set of technologies to ensure security, scalability, and efficiency.

### TECHNOLOGIES USED

#### Server

- ExpressJs: Web application framework
- Mongoose: MongoDB Object Modeling for node.js
- Nodemailer: Library for sending emails
- Cors: Middleware to enable CORS
- Bcrypt: pasword hashing tool
- Nodejs Modules: path, crypto, fs module for various utilities
- Morgan: HTTP request logger
- Winston: Logging library
- Redis: In-memory data structure store for caching
- Zod: Typescript-first schema declaration and validation library
- Cookie-Parser: Middleware for parsing cookies

### Database

- Redis
- MongoDB

### FEATURES

- Authentication and Authorization
- Logging
- Caching
- CRUD Operations on Users and Products
- Mailing
- Filtering, Pagination, Sorting

#### Authentication and Authorization

- JWT (JSON Web Token): implemented to give a flexible and secure authetication system
- Permission Based Access Control was implemented to ensure that certain permissions are only accessible to some certain roles.

#### LOGGING

- Winston: Used for logging
- Morgan configured with Winston to log http requests.

#### CACHING

- Redis:  Used to cache endpoints for a limited period.

#### CRUD OPERATIONS

Users

- create a user (Signup)
- User signin
- Edit User: only by the user or admin
- Delete User: only by the user or admin
- Get List of Users: only by logged-in users
- Get Specific User By ID: only by logged-in users

Products

- create a product only by a logged in user
- edit a product only by the user who created it.
- delete a product only by the user who created it.
- get a list of products by user
- get a particular product any user

### Configuration and SetUp

1. Open the source code in your favourite editor.
2. Open your terminal to this project location.
3. Split your terminal into two or open another tab of your terminal.
4. Then `npm install`.
5. Copy `.env.example` file to `.env`.

| Name                             | Description                                                    |
| -------------------------------- | -------------------------------------------------------------- |
| MONGO_URL                        | MongoDB connection string                                      |
| AUTH_REFRESH_TOKEN_SECRET        | Secret for signing **Refresh token**                           |
| AUTH_REFRESH_TOKEN_EXPIRY        | Expiry length of the Refresh Token                             |
| AUTH_ACCESS_TOKEN_SECRET         | Secret for signing **Access token**                            |
| RESET_TOKEN_SECRET               | Secret for signing **RESET TOKEN**                             |
| AUTH_ACCESS_TOKEN_EXPIRY         | Expiry length of the Access Token                              |
| RESET_PASSWORD_TOKEN_EXPIRY_MINS | Expirty time for password reset link.(in minutes)              |
| SMTP_HOST                        | SMTP host for NodeMailer                                       |
| SMTP_PASSWORD                    | SMTP email password for NodeMailer                             |
| SMTP_USER                        | The sender email address for Nodemailer                        |
| SALT                             | Number of bcrypt hash rounds                                   |

## Run the project

You can run the project using configured scripts.

`npm run dev`

## API Endpoints

### User Endpoints

#### Signup

- Endpoint: `/api/users/signup`
- Method: `POST`
- Description: Create a new user.
- Request Body:
  ```
  {
  "username": "string",
  "email": "string",
  "password": "string"
  }
  ```
- Response: `201 Created`

#### Signin

- Endpoint: `/api/users/signin`
- Method: `POST`
- Description: Create a new user.
- Request Body:
  ```
  {
  "email": "string",
  "password": "string"
  }
  ```
- Response: `200 OK`

#### Edit User

- Endpoint: `/api/users/:id`
- Method: `PUT`
- Description: Edit a user's information
- Request Params:
  - `id`: User Id
- Request Body:
  ```
  {
  "username": "string",
  }
  ```
- Response: `200 OK`

#### Delete User

- Endpoint: `/api/users/:id`
- Method: `DELETE`
- Description: Edit a user.
- Request Params:
  - `id`: User Id
- Request Body:
  ```
  {
  "username": "string",
  }
  ```
- Response: `204 No Content`

#### Get User by ID

- Endpoint: `/api/users/:id`
- Method: `GET`
- Description: Edit a specific user by ID.
- Request Params:
  - `id`: User Id
- Response: `200 OK`

#### Get Users

- Endpoint: `/api/users`
- Method: `GET`
- Description: Get a list of users.
- Request Params:
  - `id`: User Id
- Response: `200 OK`

### Product Endpoints
#### Create Product

- Endpoint: `/api/products`
- Method: `POST`
- Description: Create a product.
- Request Body:
  ```
  {
  "name": "string",
  "description": "string",
  "price": "string",
  "genre": ["string"],
  "units": "string"
  }
  ```
- Response: `201 Created`

#### Edit product

- Endpoint: `/api/products/:id`
- Method: `PUT`
- Description: Edit a product detail.
- Request Params:
  - `id`: Product ID
- Request Body:
  ```
  {
  "name": "string",
  "description": "string",
  "price": "string",
  "genre": ["string"],
  "units": "string"
  }
  ```
- Response: `200 OK`

#### Delete product

- Endpoint: `/api/products/:id`
- Method: `DELETE`
- Description: Delete a product.
- Request Params:
  - `id`: Product ID
- Response: `204 No Content`

#### Get products

- Endpoint: `/api/products`
- Method: `GET`
- Description: Get all products.
- Response: `200 OK`

#### Get product by ID

- Endpoint: `/api/products/:id`
- Method: `GET`
- Description: Get all products.
- Request Params:
  -`id`: Product ID
- Response: `200 OK`

### Conclusion

This documentation provides an overview of the REST API, including its features, configuration, setup, and endpoint details. Follow the setup instructions carefully and use the provided examples to interact with the API. For further details or assistance, refer to the comments in the source code or contact [@Muyiwa](mailto:code.with.muyiwa@gmail.com).

## Author
- Email: [@Muyiwa](mailto:code.with.muyiwa@gmail.com)

