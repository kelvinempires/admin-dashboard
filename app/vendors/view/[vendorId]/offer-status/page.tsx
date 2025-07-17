"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Clock } from "lucide-react";
import { getVendorById } from "@/lib/vendors";
import { VendorProfile } from "@/components/vendor/VendorProfile";

export default function OfferStatusPage({
  params,
}: {
  params: { vendorId: string };
}) {
  const vendor = getVendorById(params.vendorId);
  if (!vendor) return notFound();

  // Sample offer data - in a real app this would come from props or API
  const offerDetails = {
    status: "sent",
    sentDate: "April 24, 2025",
    eventDates: "May 1 - 2, 2025",
    guests: 100,
    offerAmount: 1200,
    days: 2,
    totalAmount: 2400,
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white h-screen">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link
          href="/vendors"
          className="flex items-center hover:text-gray-800 hover:underline"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Vendors
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/vendors/view/${vendor.id}`}
          className="hover:text-gray-800 hover:underline"
        >
          {vendor.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="font-semibold text-gray-800">Offer status</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-8">
        {/* Left Column - Offer Status (2/3 width) */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6">
            <div className="flex items-center gap-3 mb-6 p-4 bg-[#f7ebff] rounded-lg w-full">
              <Clock className="w-6 h-6 text-yellow-500" />
              <div className="">
                <h2 className="font-semibold text-gray-800">Offer sent</h2>
                <p className="text-gray-600">Awaiting vendor response</p>
                <p className="text-sm text-gray-500 mt-1">
                  Sent on {offerDetails.sentDate}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                Your offer
              </h3>
              <div className="flex gap-28 sm:gap-64 mb-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-400">Dates</h4>
                  <p className="mt-1 font-medium text-gray-800">
                    {offerDetails.eventDates}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400">Guests</h4>
                  <p className="mt-1 font-medium text-gray-800">
                    {offerDetails.guests} guests
                  </p>
                </div>
              </div>
              <div className="flex gap-28 sm:gap-64 mb-4">
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-400">
                    Offer amount
                  </h4>
                  <p className="mt-1 font-medium text-gray-800">
                    ${offerDetails.offerAmount} per day
                  </p>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-400">Total</h4>
                  <p className="mt-1 font-bold text-gray-800">
                    ${offerDetails.totalAmount}
                  </p>
                </div>
              </div>
            </div>

            <Link
              href={`/vendors/view/${vendor.id}/make-offer`}
              className="text-[#6946e2] font-medium hover:underline"
            >
              Edit offer
            </Link>
          </div>
        </div>

        {/* Right Column - Vendor Summary (1/3 width) */}
        <div>
          <VendorProfile vendor={vendor} />
        </div>
      </div>
    </div>
  );
}
