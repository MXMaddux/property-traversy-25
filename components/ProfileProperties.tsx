"use client";

import React from "react";
import { IPropertyLean } from "@/models/Property";

interface ProfilePropertiesProps {
  properties: IPropertyLean[];
}

const ProfileProperties: React.FC<ProfilePropertiesProps> = ({
  properties,
}) => {
  return (
    <div className="space-y-6">
      {properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        properties.map((property) => (
          <div
            key={property._id}
            className="bg-white shadow-md rounded-lg p-6 border"
          >
            <p className="text-gray-600 mb-2">
              <span className="font-semibold text-gray-900">Name:</span>{" "}
              {property.name}
            </p>
            {/* <h3 className="text-black text-xl font-bold mb-2">
              {property.name}
            </h3> */}
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Type:</span> {property.type}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Beds:</span> {property.beds} |{" "}
              <span className="font-semibold">Baths:</span> {property.baths}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Square Feet:</span>{" "}
              {property.square_feet}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Amenities:</span>{" "}
              {property.amenities.join(", ")}
            </p>
            {property.location && (
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Location:</span>{" "}
                {property.location.city}, {property.location.state},{" "}
                {property.location.zipcode}
              </p>
            )}
            {/* <p className="text-gray-600 mb-2">
              <span className="font-semibold">Featured:</span>{" "}
              {property.is_featured ? "Yes" : "No"}
            </p> */}
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Rates:</span>{" "}
              {property.rates.nightly && `$${property.rates.nightly}/night`}
              {property.rates.weekly && `, $${property.rates.weekly}/week`}
              {property.rates.monthly && `, $${property.rates.monthly}/month`}
            </p>
            {property.seller_info && (
              <div className="text-gray-600 mb-2">
                <span className="font-semibold">Seller Info:</span>
                <p>Name: {property.seller_info.name}</p>
                <p>Email: {property.seller_info.email}</p>
                <p>Phone: {property.seller_info.phone}</p>
              </div>
            )}
            {property.images && property.images.length > 0 && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-2">Images:</h4>
                <div className="flex space-x-4">
                  {property.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Property ${index + 1}`}
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ProfileProperties;
