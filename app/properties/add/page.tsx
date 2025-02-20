// import PropertyAddForm from "@/components/PropertyAddForm";

// function AddPropertyPage() {
//   return (
//     <section>
//       <div className="container m-auto max-w-2xl py-24">
//         <div className="bg-white px-6 py-8 shadow-md rounded-md border m-4 md:m-0">
//           <PropertyAddForm />
//         </div>
//       </div>
//     </section>
//   );
// }
// export default AddPropertyPage;

// app/actions/addProperty.ts
import Property from "@/models/Property";
import connectDb from "@/config/database";

export default async function addProperty(formData: any) {
  try {
    await connectDb();

    // Extract seller_info
    const sellerInfo = {
      name: formData.seller_info?.name || null,
      email: formData.seller_info?.email || null,
      phone: formData.seller_info?.phone || null,
    };

    // Validate seller_info.name
    if (!sellerInfo.name) {
      throw new Error("Seller name is required");
    }

    // Create the property document
    const newProperty = new Property({
      owner: formData.owner,
      name: formData.name,
      type: formData.type,
      description: formData.description,
      location: formData.location,
      beds: formData.beds,
      baths: formData.baths,
      square_feet: formData.square_feet,
      amenities: formData.amenities,
      rates: formData.rates,
      seller_info: sellerInfo,
      images: formData.images,
      is_featured: formData.is_featured,
    });

    // Save the property
    await newProperty.save();
    return { success: true, message: "Property added successfully" };
  } catch (error) {
    console.error("Error adding property:", error);
    return { success: false, message: error.message };
  }
}
