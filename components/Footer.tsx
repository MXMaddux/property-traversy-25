"use client"; // Mark this as a Client Component if you're using Next.js 13+ App Router
import Image from "next/image";
import Link from "next/link";
import logo from "@/_theme_files/images/logo.png";

function Footer({ currentYear }: { currentYear: number }) {
  return (
    <footer className="bg-gray-200 py-4 mt-24">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        {/* Logo Section */}
        <div className="mb-4 md:mb-0">
          <Image src={logo} alt="Logo" width={100} height={30} />
        </div>
        {/* Links Section */}
        <div className="flex flex-wrap justify-center md:justify-start mb-4 md:mb-0">
          <ul className="flex space-x-4">
            <li>
              <Link href="/properties" className="hover:text-gray-700">
                Properties
              </Link>
            </li>
            <li>
              <Link href="/terms-of-service" className="hover:text-gray-700">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
        {/* Copyright Section */}
        <div>
          <p
            className="text-sm text-gray-500 mt-2 md:mt-0"
            suppressHydrationWarning
          >
            &copy; {currentYear} PropertyPulse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
