import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyImages from "@/components/PropertyImages";
import connectDb from "@/config/database";
import Property, { IProperty } from "@/models/Property";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

type PropertyPageProps = {
  params: {
    id: string;
  };
};

async function PropertyPage({ params }: PropertyPageProps) {
  // Ensure database connection is established
  await connectDb();

  // Fetch the property using `params.id` asynchronously
  const property = (await Property.findById(
    params.id
  ).lean()) as IProperty | null;

  // Handle cases where the property is not found
  if (!property) {
    return <div>Property not found</div>;
  }

  // Safely access the first image URL or use a default image
  const headerImage = property.images?.[0] || "/images/default.jpg";

  return (
    <>
      <PropertyHeaderImage image={headerImage} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <PropertyDetails property={property} />
          </div>
        </div>
      </section>
      <PropertyImages images={property.images || []} />
    </>
  );
}

export default PropertyPage;
