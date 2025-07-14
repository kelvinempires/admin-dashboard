"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { vendors } from "@/lib/vendors";
import { VendorsGrid } from "@/components/vendor/VendorsGrid";

const locations = [
  "Eastbridge",
  "Westridge",
  "Northbridge",
  "Southbridge",
  "Central District",
];

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Eastbridge");

  // Convert URL parameter to display format
  const categoryName = params.category
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  // Filter vendors by category
  const categoryVendors = vendors.filter(
    (vendor) => vendor.category.toLowerCase() === categoryName.toLowerCase()
  );

  if (categoryVendors.length === 0) return notFound();

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 bg-white">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center text-sm text-gray-600 mb-6">
        <Link
          href="/vendors"
          className="flex items-center hover:text-gray-800 hover:underline transition-colors "
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Vendors
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-800 font-semibold">{categoryName}</span>
      </nav>

      {/* Page Header */}
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {categoryName}
        </h1>
      </header>

      {/* Location Filter Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <p className="text-sm text-[#a5adbc]">Showing vendors in</p>
          <div className="relative">
            <button
              className="flex items-center gap-1 text-gray-800 font-medium hover:text-[#2a1d52] focus:outline-none"
              onClick={() => setIsLocationOpen(!isLocationOpen)}
              aria-expanded={isLocationOpen}
            >
              {selectedLocation}
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-150 ${
                  isLocationOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isLocationOpen && (
              <div className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-md border border-gray-100">
                <div className="py-1">
                  {locations.map((location) => (
                    <button
                      key={location}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        selectedLocation === location
                          ? "bg-[#f5f0ff] text-[#2a1d52]"
                          : "text-gray-700 hover:bg-gray-50"
                      } transition-colors duration-100`}
                      onClick={() => {
                        setSelectedLocation(location);
                        setIsLocationOpen(false);
                      }}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Vendor Grid */}
      <div className="mb-8">
        <VendorsGrid
          vendors={categoryVendors}
          className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        />
      </div>
    </div>
  );
}
