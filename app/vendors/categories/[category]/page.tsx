"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { vendors } from "@/lib/vendors";
import { VendorsGrid } from "@/components/vendor/VendorsGrid";
import { LocationFilter } from "@/components/vendor/LocationFilter";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const [selectedLocation, setSelectedLocation] = useState("All");

  // Convert URL parameter to display format
  const categoryName = params.category
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  // Filter vendors by category first (from URL), then by location
  const filteredVendors = vendors.filter((vendor) => {
    const isCorrectCategory =
      vendor.category.toLowerCase() === params.category.toLowerCase();
    const isCorrectLocation =
      selectedLocation === "All" || vendor.location === selectedLocation;
    return isCorrectCategory && isCorrectLocation;
  });

  if (filteredVendors.length === 0) return notFound();

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 bg-white">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center text-sm text-gray-600 mb-6">
        <Link
          href="/vendors"
          className="flex items-center hover:text-gray-800 hover:underline transition-colors"
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

      {/* Location Filter Only */}
      <div className="mb-8">
        <LocationFilter
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
        />
      </div>

      {/* Vendor Grid */}
      <div className="mb-8">
        <VendorsGrid
          vendors={filteredVendors}
          className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        />
      </div>
    </div>
  );
}
