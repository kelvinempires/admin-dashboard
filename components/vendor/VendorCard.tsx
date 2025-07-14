// components/vendor/VendorCard.tsx
import { Vendor } from "@/types/vendor";

export function VendorCard({ vendor }: { vendor: Vendor }) {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 bg-gray-200 relative">
        <img
          src={vendor.images[0]}
          alt={vendor.name}
          className="w-full h-full object-cover"
        />
        {vendor.verified && (
          <div className="absolute top-2 left-2 bg-white p-1 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{vendor.name}</h3>
          <span className="text-gray-600">{vendor.price}</span>
        </div>
        <div className="flex items-center mb-2">
          <span className="text-yellow-500">★ {vendor.rating.toFixed(1)}</span>
          <span className="text-gray-500 ml-1">({vendor.reviewCount})</span>
        </div>
        <p className="text-gray-500 text-sm">{vendor.category}</p>
      </div>
    </div>
  );
}
