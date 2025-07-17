"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, ChevronLeft } from "lucide-react";
import { getVendorById } from "@/lib/vendors";
import { CreditCard } from "lucide-react";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { VendorProfile } from "@/components/vendor/VendorProfile";

export default function BookNowPage({
  params,
}: {
  params: { vendorId: string };
}) {
  // Sample events data - in a real app this would come from props or state
    const router = useRouter();
     const handlePayment = () => {
       // Here we would typically:
       // 1. Validate form inputs
       // 2. Process payment (via API call)
       // 3. Then navigate on success

       // For now, i will just navigate directly
       if (vendor) {
         router.push(`/vendors/view/${vendor.id}/booking-details`);
       }
     };
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
  const selectedEvent = events.find((event) => event.id === selectedEventId);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("credit_card");

  const vendor = getVendorById(params.vendorId);
  if (!vendor) return notFound();

  const bookingDetails = {
    eventName: selectedEvent?.name || "",
    eventDescription: selectedEvent?.description || "",
    eventType: "Wedding", // This could also be dynamic
    dates: selectedEvent?.date || "",
    guests: selectedEvent?.guests || 0,
    days: 2, // Calculate based on dates if needed
    pricePerDay: vendor.pricePerDay,
    totalPrice: vendor.pricePerDay * 2,
  };

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
        <span className="font-semibold text-gray-800">Book now</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-8">
        {" "}
        {/* Left Column - Booking Form (2/3 width) */}
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
                className="w-full p-3 border border-gray-200 text-gray-700 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-200 "
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

            {/* Event Details Card */}

            <h4 className="font-semibold text-gray-800 mb-4 block border-b border-gray-200 pb-2">
              Your event
            </h4>
            <div className="flex gap-28 sm:gap-64 mb-6">
              <div>
                <h4 className="text-sm font-medium text-gray-400">Dates</h4>
                <p className="mt-1 font-medium text-gray-800">
                  {bookingDetails.dates}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400">Guests</h4>
                <p className="mt-1 font-medium text-gray-800">
                  {bookingDetails.guests} guests
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="mb-2 text-gray-800 font-semibold border-b border-gray-200 pb-2">
                Price details
              </h3>
              <div className="space-y-2">
                <div className="flex gap-28 sm:gap-64 mb-6">
                  <span className="text-gray-800">
                    ${vendor.pricePerDay} x {bookingDetails.days} days
                  </span>
                  <span className="text-gray-800">
                    ${vendor.pricePerDay * bookingDetails.days}
                  </span>
                </div>
              </div>
              <div className="mt-3 p-3 rounded-lg bg-[#fef6e7] text-gray-700">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-yellow-500" />
                  <span>
                    Your payment will be held securely and released in stages as
                    the vendor completes agreed milestones.
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-4 block border-b border-gray-200 pb-2">
                Pay with
              </h3>

              {/* Payment Method Selection with Radio Buttons */}
              <div className="flex flex-col gap-3 mb-6">
                {/* Credit Card Option */}
                <label className="flex  items-start p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-col ml-3 w-full">
                    <div className="flex flex-row justify-between ml-3 w-full pr-5">
                      <div className="flex items-center">
                        <CreditCard className="w-5 h-5 mr-3 text-gray-700" />
                        <span className="text-sm font-medium text-gray-700">
                          Credit or debit card
                        </span>
                      </div>
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={selectedPaymentMethod === "credit_card"}
                        onChange={() => setSelectedPaymentMethod("credit_card")}
                        className="h-4 w-4 mt-1 text-[#6946e2] border-gray-300 focus:ring-[#6946e2]"
                      />
                    </div>

                    {/* Credit Card Form Fields (shown when selected) */}
                    {selectedPaymentMethod === "credit_card" && (
                      <div className="mt-4 space-y-4">
                        {/* Card Number */}
                        <div>
                          <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                            Card number
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="0000 0000 0000 0000"
                            className="w-full p-3 border text-gray-400 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6946e2] focus:border-[#6946e2]"
                          />
                        </div>

                        {/* Expiry and CVV */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                              Expires
                              <span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              className="w-full p-3 border text-gray-400 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6946e2] focus:border-[#6946e2]"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                              CVV
                              <span className="text-red-500 ml-1">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="123"
                              className="w-full p-3 border text-gray-400 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6946e2] focus:border-[#6946e2]"
                            />
                          </div>
                        </div>

                        {/* Billing Address */}
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                            Billing address
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <select className="w-full p-3 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6946e2] focus:border-[#6946e2] mb-2">
                            <option value="">Select country</option>
                            <option value="nigeria">Nigeria</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                </label>

                {/* Other Payment Methods */}
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-row justify-between ml-3 w-full pr-2">
                    <div className="flex items-center ml-3">
                      <img
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/stripe/stripe-original.svg"
                        className="w-5 h-5 mr-3"
                        alt="Stripe"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Stripe
                      </span>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={selectedPaymentMethod === "stripe"}
                      onChange={() => setSelectedPaymentMethod("stripe")}
                      className="h-4 w-4 text-[#6946e2] border-gray-300 focus:ring-[#6946e2]"
                    />
                  </div>
                </label>

                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-row justify-between ml-3 w-full pr-2">
                    <div className="flex items-center ml-3">
                      <img
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/paypal/paypal-original.svg"
                        className="w-5 h-5 mr-3"
                        alt="PayPal"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        PayPal
                      </span>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={selectedPaymentMethod === "paypal"}
                      onChange={() => setSelectedPaymentMethod("paypal")}
                      className="h-4 w-4 text-[#6946e2] border-gray-300 focus:ring-[#6946e2]"
                    />
                  </div>
                </label>

                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-row justify-between ml-3 w-full pr-2">
                    <div className="flex items-center ml-3">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
                        className="w-5 h-5 mr-3"
                        alt="Google Pay"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Google Pay
                      </span>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={selectedPaymentMethod === "google_pay"}
                      onChange={() => setSelectedPaymentMethod("google_pay")}
                      className="h-4 w-4 text-[#6946e2] border-gray-300 focus:ring-[#6946e2]"
                    />
                  </div>
                </label>

                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-row justify-between ml-3 w-full pr-2">
                    <div className="flex items-center ml-3">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png"
                        className="w-5 h-5 mr-3"
                        alt="Apple Pay"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        Apple Pay
                      </span>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={selectedPaymentMethod === "apple_pay"}
                      onChange={() => setSelectedPaymentMethod("apple_pay")}
                      className="h-4 w-4 text-[#6946e2] border-gray-300 focus:ring-[#6946e2]"
                    />
                  </div>
                </label>
              </div>

              {/* Error Message */}
              {/* <div className="mt-4 flex items-center text-sm text-red-600">
                <AlertCircle className="w-4 h-4 mr-2" />
                <span>Please check your payment details and try again</span>
              </div> */}
            </div>

            <button
              onClick={handlePayment}
              className="w-full py-[7px] px-4 rounded-full text-center font-medium transition-all duration-300 relative overflow-hidden border border-[#6946e2] bg-white group"
            >
              <span className="relative z-10 bg-clip-text text-sm font-semibold text-transparent bg-gradient-to-b from-[#6946e2] to-[#b868fa] group-hover:from-white group-hover:to-white/90">
                Pay ${vendor.pricePerDay * bookingDetails.days}
              </span>
              <span className="absolute inset-0 bg-gradient-to-b from-[#b868fa] to-[#6946e2] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
            </button>
          </div>
        </div>
        {/* Right Column - Vendor Summary (1/3 width) */}
        <div>
          <VendorProfile vendor={vendor}/>
        </div>
        
      </div>
    </div>
  );
}
