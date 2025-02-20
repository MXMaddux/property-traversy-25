import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProperty extends Document {
  owner: string;
  name: string;
  type: string;
  description?: string;
  location?: {
    street?: string;
    city?: string;
    state?: string;
    zipcode?: string;
  };
  beds: number;
  baths: number;
  square_feet: number;
  amenities: string[];
  rates: {
    nightly?: number;
    weekly?: number;
    monthly?: number;
  };
  seller_info: {
    name: string; // Marked as required
    email: string;
    phone: string;
  };
  images: string[];
  is_featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PropertySchema: Schema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String },
  location: {
    street: String,
    city: String,
    state: String,
    zipcode: String,
  },
  beds: { type: Number, required: true },
  baths: { type: Number, required: true },
  square_feet: { type: Number, required: true },
  amenities: [{ type: String }],
  rates: {
    nightly: Number,
    weekly: Number,
    monthly: Number,
  },
  seller_info: {
    name: { type: String, required: true }, // Required field
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  images: {
    type: [String],
    default: [],
  },
  is_featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const PropertyModel: Model<IProperty> =
  mongoose.models.Property ||
  mongoose.model<IProperty>("Property", PropertySchema);

export default PropertyModel;
