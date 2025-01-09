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

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  about: { type: String, default: "" },
  address: { type: String },
  type: { type: String },
  banner: { type: String, default: "" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  categories: [
    {
      categoryTitle: { type: String, required: true },
      products: [
        {
          name: { type: String, required: true },
          price: { type: Number, required: true },
          description: { type: String, required: true },
          image: { type: String },
          additionals: [
            {
              additionalName: { type: String },
              additionalPrice: { type: Number },
            },
          ],
        },
      ],
    },
  ],
});

export const Restaurant =
  mongoose.models.Restaurant || mongoose.model("Restaurant", RestaurantSchema);
