import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { Schema } from "mongoose";

export interface ProductInput {
  // seller: UserDocument["_id"];
  name: string;
  genre: string[];
  price: string;
  description: string;
  units: string;
}

export interface editProductInput {
  // seller: UserDocument["_id"];
  name?:string;
  genre?: string[];
  price?:string,
  description?: string;
  units?:string;
}

export interface ProductDocument extends ProductInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema<ProductDocument>(
  {
    // seller: {type: Schema.Types.ObjectId, ref: "User", required: true},
    name: { type: String, required: true },
    price: { type: String, required: true },
    genre: {type: [String], required: true},
    description: { type: String, required: true },
    units: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model<ProductDocument>("products", productSchema);
export default productModel
