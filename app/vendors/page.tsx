"use client";

import Link from "next/link";
import { useState } from "react";
import { vendors } from "@/lib/vendors";
import { VendorsGrid } from "@/components/vendor/VendorsGrid";
import { LocationFilter } from "@/components/vendor/LocationFilter";

const categories = [
  { name: "Catering", icon: "🍽️" },
  { name: "AudioVisual", icon: "🎤" },
  { name: "Venue", icon: "🏛️" },
  { name: "Photography", icon: "📷" },
  { name: "Entertainment", icon: "🎭" },
  { name: "Logistics", icon: "🚚" },
  { name: "EventDecor", icon: "🎀" },
];

export default function VendorsPage() {
  const [selectedLocation, setSelectedLocation] = useState("All");
  const filteredVendors = vendors.filter(
    (vendor) =>
      selectedLocation === "All" || vendor.location === selectedLocation
  );

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1 className="text-3xl font-bold text-[#2a1d52] mb-6">Vendors</h1>

      {/* Location Filter Section */}
      <div className="mb-12">
        <LocationFilter
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
        />

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/vendors/categories/${category.name.toLowerCase()}`}
              className="border border-[#c96fff] bg-[#f9f9f9] rounded-lg p-4 text-center hover:bg-[#f8e9ff] hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center text-[#2a1d52] hover:text-[#c96fff] cursor-pointer"
            >
              <span className="text-2xl block mb-2">{category.icon}</span>
              <span className="font-medium text-[#2a1d52]">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Vendors Section */}
      <div>
        <h2 className="text-xl font-semibold mb-6 text-[#2a1d52]">
          Popular vendors
        </h2>
        <VendorsGrid vendors={filteredVendors} />
      </div>
    </div>
  );
}
