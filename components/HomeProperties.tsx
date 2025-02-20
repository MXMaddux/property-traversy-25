import PropertyCard from "./PropertyCard";
import Link from "next/link";
import connectDb from "@/config/database";
import PropertyModel, { IPropertyLean } from "@/models/Property";
import mongoose from "mongoose";

async function HomeProperties() {
  await connectDb();
  try {
    // Fetch raw properties from the database
    const rawProperties = await PropertyModel.find({})
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

    // Log the fetched data for debugging
    console.log("Fetched properties:", rawProperties);

    // Validate the fetched data
    if (!isPropertyArray(rawProperties)) {
      throw new Error("Fetched properties do not match the expected type.");
    }

    // Transform the raw data into the desired format
    const recentProperties = rawProperties.map((property) => ({
      ...property,
      _id: String(property._id),
      owner: String(property.owner),
      description: property.description || "",
      location: property.location || {},
      amenities: property.amenities || [],
      rates: property.rates || {},
      seller_info: property.seller_info || {},
      imageUrls: property.images || [], // Map "images" to "imageUrls"
      createdAt: property.createdAt.toISOString(),
      updatedAt: property.updatedAt.toISOString(),
    })) as IPropertyLean[];

    return (
      <>
        <section className="px-4 py-6">
          <div className="container-xl lg:container m-auto px-4 py-6">
            <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
              Recent Properties
            </h2>
            {recentProperties.length === 0 ? (
              <p>No properties found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentProperties.map((property) => (
                  <PropertyCard
                    key={String(property._id)}
                    property={property}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
        <section className="m-auto max-w-lg my-6 px-6">
          <Link
            href={"/properties"}
            className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
          >
            View All Properties
          </Link>
        </section>
      </>
    );
  } catch (error) {
    console.error("Error fetching properties:", error);
    return <p>Error loading properties.</p>;
  }
}

export default HomeProperties;

// Type Guard Functions
function isPropertyArray(obj: any): obj is IPropertyLean[] {
  return Array.isArray(obj) && obj.every(isProperty);
}

function isProperty(obj: any): obj is IPropertyLean {
  return (
    obj &&
    (typeof obj._id === "string" ||
      obj._id instanceof mongoose.Types.ObjectId) &&
    (typeof obj.owner === "string" ||
      obj.owner instanceof mongoose.Types.ObjectId) &&
    typeof obj.name === "string" &&
    typeof obj.type === "string" &&
    typeof obj.beds === "number" &&
    typeof obj.baths === "number" &&
    typeof obj.square_feet === "number" &&
    Array.isArray(obj.amenities) &&
    (obj.rates === undefined || typeof obj.rates === "object") &&
    (obj.seller_info === undefined || typeof obj.seller_info === "object") &&
    Array.isArray(obj.images) && // Use "images" instead of "imageUrls"
    typeof obj.is_featured === "boolean"
  );
}
