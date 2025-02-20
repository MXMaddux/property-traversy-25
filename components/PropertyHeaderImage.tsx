import React from "react";
import Image from "next/image";

// Define the prop types for the component
interface PropertyHeaderImageProps {
  image: string; // The image URL passed as a prop
}

// Functional component that accepts the `image` prop
const PropertyHeaderImage: React.FC<PropertyHeaderImageProps> = ({ image }) => {
  return (
    <>
      <section>
        <div className="container-xl m-auto">
          <div className="grid grid-cols-1">
            <Image
              src={image}
              alt=""
              className="object-cover h-[400px] w-full"
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyHeaderImage;
