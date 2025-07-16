"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, CheckCircle } from "lucide-react";
import { getVendorById } from "@/lib/vendors";
import { useState } from "react";

export default function MakeOfferPage({
  params,
}: {
  params: { vendorId: string };
}) {
  // Sample events data
  const events = [
    {
      id: "1",
      name: "Oliver & Emily's Wedding",
      description: "Wedding ceremony and reception",
      date: "May 1 - 2, 2025",
      guests: 100,
    },
    {
      id: "2",
      name: "Corporate Annual Gala",
      description: "Company annual celebration event",
      date: "June 15, 2025",
      guests: 200,
    },
    {
      id: "3",
      name: "Sarah's 30th Birthday",
      description: "Milestone birthday celebration",
      date: "July 20, 2025",
      guests: 50,
    },
  ];

  const [selectedEventId, setSelectedEventId] = useState(events[0].id);
  const [offerAmount, setOfferAmount] = useState(1200);
  const [message, setMessage] = useState(
    "We're hosting a corporate event and would like you to consider our offer to rent your hall for 2 days at this price."
  );

  const vendor = getVendorById(params.vendorId);
  if (!vendor) return notFound();

  const selectedEvent = events.find((event) => event.id === selectedEventId);

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
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
        <span className="font-semibold text-gray-800">Make an offer</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-8">
        {" "}
        {/* Left Column - Offer Form (2/3 width) */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6">
            {/* Event Selection Dropdown */}
            <div className="mb-6">
              <label
                htmlFor="event-select"
                className="font-semibold text-gray-800 mb-4 block"
              >
                Assign to event
              </label>
              <select
                id="event-select"
                className="w-full p-3 border border-gray-200 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-200"
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
              >
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Event Details */}
            <h4 className="font-semibold text-gray-800 mb-4 block border-b border-gray-200 pb-2">
              Your event
            </h4>
            <div className="flex gap-28 sm:gap-64 mb-6">
              <div>
                <h4 className="text-sm font-medium text-gray-400">Dates</h4>
                <p className="mt-1 font-medium text-gray-800">
                  {selectedEvent?.date}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400">Guests</h4>
                <p className="mt-1 font-medium text-gray-800">
                  {selectedEvent?.guests} guests
                </p>
              </div>
            </div>

            {/* Offer Amount */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-4 block pb-2">
                Your offer amount
              </h3>
              <div className="relative">
                <select
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(Number(e.target.value))}
                  className="w-full pl-3 pr-12 py-3 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6946e2] focus:border-[#6946e2] appearance-none"
                >
                  <option value="1000">$1,000</option>
                  <option value="1100">$1,100</option>
                  <option value="1200">$1,200</option>
                  <option value="1300">$1,300</option>
                  <option value="1400">$1,400</option>
                  <option value="1500">$1,500</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">per day</span>
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/* Message to Vendor */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-4 block pb-2">
                Message to vendor (optional)
              </h3>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6946e2] focus:border-[#6946e2] resize-none"
                rows={4}
              />
            </div>
            <button className="w-full py-[7px] px-4 rounded-full text-center font-medium transition-all duration-300 relative overflow-hidden border border-[#6946e2] bg-white group">
              <span className="relative z-10 bg-clip-text text-sm font-semibold text-transparent bg-gradient-to-b from-[#6946e2] to-[#b868fa] group-hover:from-white group-hover:to-white/90">
                Submit offer
              </span>
              <span className="absolute inset-0 bg-gradient-to-b from-[#b868fa] to-[#6946e2] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
            </button>
          </div>
        </div>
        {/* Right Column - Vendor Summary (1/3 width) */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6">
            <div className="flex items-center mb-4">
              <div className="w-24 h-24 bg-gray-200 rounded-lg mr-4 overflow-hidden">
                {vendor.images[0] && (
                  <img
                    src={vendor.images[0]}
                    alt={vendor.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div>
                <h1 className="text-semibold text-xl text-gray-900 font-bold flex items-center gap-1">
                  {vendor.name}
                  {vendor.verified && (
                    <span className="text-[#0e7b33]">
                      <CheckCircle className="w-5 h-5" />
                    </span>
                  )}
                </h1>
                <h2 className="text-gray-700 font-semibold">
                  ${vendor.pricePerDay} per day
                </h2>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(vendor.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-1 text-gray-900 font-semibold">
                    {vendor.rating.toFixed(2)}
                  </span>
                  <span className="text-gray-500 ml-2 text-sm">
                    ({vendor.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
