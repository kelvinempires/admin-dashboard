"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, CheckCircle, Clock, Plus, Check } from "lucide-react";
import { getVendorById } from "@/lib/vendors";
import { useState } from "react";

type BookingStatus = "pending" | "confirmed" | "add-milestone" | "add-review";

export default function BookingDetailsPage({
  params,
}: {
  params: { vendorId: string };
}) {
  const [status, setStatus] = useState<BookingStatus>("pending");
  const [milestones, setMilestones] = useState([
    {
      id: "1",
      name: "Deliver 5,000 chairs to event hall",
      amount: 500,
      dueDate: "2025-02-19",
      completed: false,
    },
    {
      id: "2",
      name: "Setup event hall",
      amount: 500,
      dueDate: "2025-03-19",
      completed: false,
    },
    {
      id: "3",
      name: "Final cleanup",
      amount: 500,
      dueDate: "2025-03-20",
      completed: false,
    },
  ]);

  const [newMilestone, setNewMilestone] = useState({
    name: "",
    amount: 0,
    dueDate: "",
    description: "",
  });

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const vendor = getVendorById(params.vendorId);
  if (!vendor) return notFound();

  const totalAmount = 1500;
  const paidAmount = milestones.reduce(
    (sum, m) => (m.completed ? sum + m.amount : sum),
    0
  );
  const escrowBalance = totalAmount - paidAmount;

  const handleAddMilestone = () => {
    if (newMilestone.name && newMilestone.amount > 0 && newMilestone.dueDate) {
      setMilestones([
        ...milestones,
        {
          id: Date.now().toString(),
          name: newMilestone.name,
          amount: newMilestone.amount,
          dueDate: newMilestone.dueDate,
          completed: false,
        },
      ]);
      setNewMilestone({ name: "", amount: 0, dueDate: "", description: "" });
      setStatus("pending");
    }
  };

  const handleSubmitReview = () => {
    // In a real app, you would submit this to your backend
    console.log("Review submitted:", { rating, review });
    // Then navigate back to vendor page or bookings list
  };

  const renderPendingConfirmation = () => (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="w-6 h-6 text-blue-500" />
        <div>
          <h2 className="font-semibold text-gray-800">Booking Details</h2>
          <p className="text-gray-600">
            Hang tight. We are waiting for the vendor to confirm your booking.
            This usually takes a few hours.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-400">Total paid</h4>
          <p className="mt-1 font-bold text-gray-800">
            ${paidAmount.toFixed(2)}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-400">Escrow balance</h4>
          <p className="mt-1 font-bold text-gray-800">
            ${escrowBalance.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-gray-800">Milestones</h3>
          <button
            onClick={() => setStatus("add-milestone")}
            className="flex items-center text-[#6946e2] font-medium hover:underline"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add milestone
          </button>
        </div>

        <div className="space-y-4">
          {milestones.map((milestone) => (
            <div
              key={milestone.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-800">
                    {milestone.name}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Due:{" "}
                    {new Date(milestone.dueDate).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">${milestone.amount}</p>
                  {milestone.completed && (
                    <span className="inline-flex items-center text-sm text-green-600 mt-1">
                      <Check className="w-4 h-4 mr-1" />
                      Completed
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={() => setStatus("add-review")}
          className="w-full py-3 px-4 bg-[#6946e2] rounded-lg text-white font-medium"
        >
          Complete Booking
        </button>
      </div>
    </div>
  );

  const renderAddMilestone = () => (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h2 className="font-semibold text-gray-800 mb-6">Add milestone</h2>

      <div className="mb-4">
        <p className="text-gray-600 mb-2">
          Amount remaining: ${escrowBalance.toFixed(2)}
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Milestone name
          </label>
          <input
            type="text"
            className="w-full p-3 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6946e2] focus:border-[#6946e2]"
            value={newMilestone.name}
            onChange={(e) =>
              setNewMilestone({ ...newMilestone, name: e.target.value })
            }
            placeholder="E.g., Deliver chairs, Setup venue, etc."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount ($)
            </label>
            <input
              type="number"
              className="w-full p-3 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6946e2] focus:border-[#6946e2]"
              value={newMilestone.amount || ""}
              onChange={(e) =>
                setNewMilestone({
                  ...newMilestone,
                  amount: Number(e.target.value),
                })
              }
              min="0"
              max={escrowBalance}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due date
            </label>
            <input
              type="date"
              className="w-full p-3 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6946e2] focus:border-[#6946e2]"
              value={newMilestone.dueDate}
              onChange={(e) =>
                setNewMilestone({ ...newMilestone, dueDate: e.target.value })
              }
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description (optional)
          </label>
          <textarea
            className="w-full p-3 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6946e2] focus:border-[#6946e2] resize-none"
            rows={3}
            value={newMilestone.description}
            onChange={(e) =>
              setNewMilestone({ ...newMilestone, description: e.target.value })
            }
            placeholder="Describe what this milestone includes..."
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={() => setStatus("pending")}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium"
        >
          Cancel
        </button>
        <button
          onClick={handleAddMilestone}
          className="px-6 py-2 bg-[#6946e2] rounded-lg text-white font-medium"
          disabled={
            !newMilestone.name || !newMilestone.amount || !newMilestone.dueDate
          }
        >
          Save
        </button>
      </div>
    </div>
  );

  const renderAddReview = () => (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h2 className="font-semibold text-gray-800 mb-2">
        How was the service from {vendor.name}?
      </h2>

      <div className="flex gap-2 mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`text-3xl ${
              rating >= star ? "text-yellow-400" : "text-gray-300"
            }`}
            onClick={() => setRating(star)}
          >
            ★
          </button>
        ))}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Write a review
        </label>
        <textarea
          className="w-full p-3 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6946e2] focus:border-[#6946e2] resize-none"
          rows={4}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Tell us more about working with this vendor..."
        />
      </div>

      <button
        onClick={handleSubmitReview}
        className="w-full py-3 px-4 bg-[#6946e2] rounded-lg text-white font-medium"
        disabled={rating === 0}
      >
        Submit Review
      </button>
    </div>
  );

  const renderContent = () => {
    switch (status) {
      case "pending":
      case "confirmed":
        return renderPendingConfirmation();
      case "add-milestone":
        return renderAddMilestone();
      case "add-review":
        return renderAddReview();
      default:
        return renderPendingConfirmation();
    }
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
        <span className="font-semibold text-gray-800">Booking Details</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-8">
        {renderContent()}

        {/* Right Column - Vendor Summary (1/3 width) */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
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
