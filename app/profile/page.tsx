import React from "react";
import Image from "next/image";
import connectDb from "@/config/database";
import Property, { IPropertyLean } from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import profileDefault from "@/assets/images/profile.png";
import ProfileProperties from "@/components/ProfileProperties";
import { convertToSerializableObject } from "@/utils/convertToObject";

async function ProfilePage() {
  await connectDb();

  // Await the sessionUser promise to get the resolved value
  const sessionUser = await getSessionUser();

  // Check if sessionUser is null
  if (!sessionUser) {
    return (
      <section className="bg-blue-50">
        <div className="container m-auto py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
            <p>You are not logged in.</p>
          </div>
        </div>
      </section>
    );
  }

  const { userId } = sessionUser;

  if (!userId) {
    throw new Error("User ID is required");
  }

  // Fetch properties owned by the user
  const propertiesDocs = await Property.find({ owner: userId })
    .lean() // Return plain JavaScript objects
    .then((props) =>
      props.map((property) => ({
        ...property,
        _id: property._id.toString(), // Convert _id to string
        owner: property.owner.toString(), // Convert owner ObjectId to string
        createdAt: property.createdAt.toISOString(), // Convert Date to ISO string
        updatedAt: property.updatedAt.toISOString(), // Convert Date to ISO string
      }))
    );

  // Transform propertiesDocs into an array of IPropertyLean objects
  const properties: IPropertyLean[] = propertiesDocs.map((doc) => {
    const serializedDoc = convertToSerializableObject(doc);

    // Ensure the object conforms to the IPropertyLean interface
    return {
      _id: serializedDoc._id,
      owner: serializedDoc.owner,
      name: serializedDoc.name,
      type: serializedDoc.type,
      description: serializedDoc.description,
      location: serializedDoc.location,
      beds: serializedDoc.beds,
      baths: serializedDoc.baths,
      square_feet: serializedDoc.square_feet,
      amenities: serializedDoc.amenities,
      rates: serializedDoc.rates,
      seller_info: serializedDoc.seller_info,
      images: serializedDoc.images,
      is_featured: serializedDoc.is_featured,
      createdAt: serializedDoc.createdAt,
      updatedAt: serializedDoc.updatedAt,
    };
  });

  // console.log(properties);

  // Check if sessionUser is not null before destructuring
  if (!sessionUser) {
    return (
      <section className="bg-blue-50">
        <div className="container m-auto py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
            <p>You are not logged in.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                {/* Use user.image or fallback to default image */}
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={sessionUser.user.image || profileDefault}
                  alt="User"
                  width={200}
                  height={200}
                />
              </div>
              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span>{" "}
                {sessionUser.user.name}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span>{" "}
                {sessionUser.user.email}
              </h2>
            </div>
            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {properties.length === 0 ? (
                <p>No properties found.</p>
              ) : (
                <ProfileProperties properties={properties} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;
