import { Schema, model, models, Document, Model } from "mongoose";

// Define the User interface
export interface IUser extends Document {
  _id: string;
  email: string;
  username: string;
  image?: string; // Optional field
  bookmarks: Schema.Types.ObjectId[]; // Array of ObjectIds referencing "Property"
  createdAt: Date;
  updatedAt: Date;
}

// Define the User schema
const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    image: {
      type: String,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Property", // Reference to the "Property" model
      },
    ],
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Define the User model
const User: Model<IUser> = models.User || model<IUser>("User", UserSchema);

export default User;
