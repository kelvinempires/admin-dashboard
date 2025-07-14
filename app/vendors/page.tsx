// app/vendors/page.tsx
"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { vendors } from "@/lib/vendors";
import { VendorsGrid } from "@/components/vendor/VendorsGrid";

const categories = [
  { name: "Catering", icon: "🍽️" },
  { name: "AudioVisual", icon: "🎤" },
  { name: "Venue", icon: "🏛️" },
  { name: "Photography", icon: "📷" },
  { name: "Entertainment", icon: "🎭" },
  { name: "Logistics", icon: "🚚" },
  { name: "EventDecor", icon: "🎀" },
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
      <h1 className="text-3xl font-bold text-[#2a1d52] mb-4 sm:mb-6 md:mb-8">
        Vendors
      </h1>

      {/* Location Dropdown Section */}
      <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-24">
        <div className="flex items-center gap-2 mb-4">
          <p className="text-sm text-[#a5adbc]">Showing vendors in</p>
          <div className="relative">
            <button
              className="flex items-center gap-1 text-gray-800 font-medium hover:text-[#c96fff] focus:outline-none cursor-pointer transition-colors duration-200 group"
              onClick={() => setIsLocationOpen(!isLocationOpen)}
            >
              {selectedLocation}
              <ChevronDown
                className={`w-4 h-4 transition-all duration-200 ${
                  isLocationOpen ? "transform rotate-180" : ""
                } group-hover:text-[#c96fff]`}
              />
            </button>

            {isLocationOpen && (
              <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200">
                <div className="py-1">
                  {locations.map((location) => (
                    <button
                      key={location}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-[#f8e9ff] transition-colors duration-200 ${
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
        <h2 className="text-xl font-semibold mb-6 text-[#2a1d52] hover:text-[#c96fff] transition-colors duration-200">
          Popular vendors
        </h2>
        <VendorsGrid vendors={vendors} />
      </div>
    </div>
  );
}
