// app/vendors/view/[vendorId]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getVendorById } from "@/lib/vendors";
import { ImageGallery } from "@/components/vendor/ImageGallery";

export default function VendorPage({
  params,
}: {
  params: { vendorId: string };
}) {
  const vendor = getVendorById(params.vendorId);
  if (!vendor) return notFound();

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <Link href="/vendors" className="hover:underline hover:text-gray-800 ">
          Vendors
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/vendors/categories/${vendor.category.toLowerCase()}`}
          className="hover:underline hover:text-gray-800"
        >
          {vendor.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="font-semibold text-gray-800">{vendor.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ImageGallery images={vendor.images} />

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700">{vendor.description}</p>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">{vendor.price}</h2>
              <div className="flex items-center mb-4">
                <span className="text-yellow-500">
                  ★ {vendor.rating.toFixed(2)}
                </span>
                <span className="text-gray-500 ml-2">
                  ({vendor.reviewCount} reviews)
                </span>
              </div>

              <div className="flex gap-4 mb-4">
                <Link
                  href={`/vendors/view/${vendor.id}/book-now`}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded text-center hover:bg-blue-700 transition-colors"
                >
                  Book now
                </Link>
                <Link
                  href={`/vendors/view/${vendor.id}/make-offer`}
                  className="flex-1 border border-blue-600 text-blue-600 py-2 px-4 rounded text-center hover:bg-blue-50 transition-colors"
                >
                  Make offer
                </Link>
              </div>

              <button className="w-full py-2 px-4 border rounded hover:bg-gray-50 transition-colors">
                Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
