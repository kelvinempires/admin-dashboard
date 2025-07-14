"use client";

import Link from "next/link";
import { ChevronDown, CheckCircle } from "lucide-react";
import { useState } from "react";
import { vendors } from "@/lib/vendors";

const categories = [
  { name: "Catering", icon: "🍽️" },
  { name: "Audio-Visual", icon: "🎤" },
  { name: "Venue", icon: "🏛️" },
  { name: "Photography", icon: "📷" },
  { name: "Entertainment", icon: "🎭" },
  { name: "Logistics", icon: "🚚" },
  { name: "Event Decor", icon: "🎀" },
];

const locations = [
  "Eastbridge",
  "Westridge",
  "Northbridge",
  "Southbridge",
  "Central District",
];

export default function VendorsPage() {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Eastbridge");

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-[#2a1d52] mb-8">Vendors</h1>

      {/* Location Dropdown Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <p className="text-sm text-[#a5adbc]">Showing vendors in</p>
          <div className="relative">
            <button
              className="flex items-center gap-1 text-gray-800 font-medium"
              onClick={() => setIsLocationOpen(!isLocationOpen)}
            >
              {selectedLocation}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isLocationOpen ? "transform rotate-180" : ""
                }`}
              />
            </button>

            {isLocationOpen && (
              <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200">
                <div className="py-1">
                  {locations.map((location) => (
                    <button
                      key={location}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-[#f8e9ff] ${
                        selectedLocation === location
                          ? "text-[#c96fff] font-medium"
                          : "text-gray-700"
                      }`}
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

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8 mr-0 sm:mr-20 md:mr-10 lg:mr-40">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/vendors/categories/${category.name.toLowerCase()}`}
              className="border border-[#c96fff] rounded-lg p-4 text-center hover:bg-[#f8e9ff] transition-colors"
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
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 mr-0 sm:mr-10 lg:mr-10">
          {vendors.map((vendor) => (
            <div key={vendor.id} className="flex flex-col">
              <div className="h-48 bg-gray-200 relative rounded-lg overflow-hidden">
                <img
                  src={vendor.images[0]}
                  alt={vendor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pt-4">
                {vendor.verified ? (
                  <div className="flex items-center gap-1 text-xs text-[#c96fff] mb-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>Verified</span>
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 mb-1">
                    {vendor.category}
                  </p>
                )}
                <div className="items-start mb-2">
                  <h3 className="font-semibold text-gray-700">{vendor.name}</h3>
                  <span className="text-gray-500 text-sm">{vendor.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
