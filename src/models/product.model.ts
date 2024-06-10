import mongoose, { mongo } from "mongoose";
import { UserDocument } from "./user.model";
import { Schema } from "mongoose";

export interface ProductInput {
  name: string;
  genre: string[];
  price: string;
  description: string;
  units: string;
  seller: string;
}

export interface editProductInput {
  name?: string;
  genre?: string[];
  price?: string;
  description?: string;
  units?: string;
}

export interface ProductDocument extends ProductInput, mongoose.Document {
  productId: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema<ProductDocument>(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    genre: { type: [String], required: true },
    description: { type: String, required: true },
    units: { type: String, required: true },
    productId: {
      type: String,
      required: true,
      unique: true,
      default: () => new mongoose.Types.ObjectId().toString(),
    },
    seller: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

productSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret) {
    const { name, price, genre, description, units, seller } = ret;

    return { name, price, genre, description, units, seller };
  },
});

const productModel = mongoose.model<ProductDocument>("products", productSchema);
export default productModel;
