import { ReactNode } from "react";
import AuthProvider from "@/components/AuthProvider";
import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

// Generate Metadata for the Page
export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Property Pulse | Find local rental properties",
    description: "Find the perfect rental property in your area.",
    keywords: "rental, property, real estate, local rentals",
  };
};

const MainLayout = ({
  children,
  currentYear,
}: {
  children: ReactNode;
  currentYear: number;
}) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer currentYear={currentYear} />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
