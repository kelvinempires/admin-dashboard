// app/vendors/view/[vendorId]/book-now/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getVendorById } from "@/lib/vendors";
import { VendorSummary } from "@/components/vendor/VendorSummary";

export default function BookNowPage({
  params,
}: {
  params: { vendorId: string };
}) {
  const vendor = getVendorById(params.vendorId);
  if (!vendor) return notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Link href="/vendors" className="hover:underline">
              Vendors
            </Link>
            <span className="mx-2">/</span>
            <Link
              href={`/vendors/view/${vendor.id}`}
              className="hover:underline"
            >
              {vendor.name}
            </Link>
            <span className="mx-2">/</span>
            <span>Book now</span>
          </div>

          <h1 className="text-2xl font-bold mb-6">Book now</h1>

          {/* Booking form content goes here */}
          {/* ... */}
        </div>

        <div className="lg:w-1/3">
          <VendorSummary vendor={vendor} />
        </div>
      </div>
    </div>
  );
}
