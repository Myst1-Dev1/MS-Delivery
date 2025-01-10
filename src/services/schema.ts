import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: "user" },
  restaurant: [{ type: Schema.Types.ObjectId, ref: "Restaurant", default: [] }],
  // orders: {type: Array, default:[]},
});

export const User = models.User || model("User", UserSchema);

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
});

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  about: { type: String, required: true },
  address: { type: String, required: true },
  type: { type: String, required: true },
  banner: { type: String, default: "" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  categories: { type: [CategorySchema], default: [] },
});

export const Restaurant =
  mongoose.models.Restaurant || mongoose.model("Restaurant", RestaurantSchema);
