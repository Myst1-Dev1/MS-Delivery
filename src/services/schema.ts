import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  zipCode: { type: String, required: true },
  role: { type: String, default: "user" },
  
});

export const User = models.User || model("User", UserSchema);