"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getVendorById } from "@/lib/vendors";
import { ImageGallery } from "@/components/vendor/ImageGallery";
import { CheckCircle, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Heart } from "lucide-react";

export default function VendorPage({
  params,
}: {
  params: { vendorId: string };
}) {
  const vendor = getVendorById(params.vendorId);

  // Always call useState, even if vendor is undefined
  const [reviews, setReviews] = useState(
    vendor?.reviews
      ? vendor.reviews.map((review) => ({
          ...review,
          isLiked: false, // Initialize all as not liked
          currentLikes: review.likes, // Initialize with original like count
        }))
      : []
  );

  const handleLikeClick = (reviewId: string) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              isLiked: !review.isLiked,
              currentLikes: review.isLiked
                ? review.currentLikes - 1
                : review.currentLikes + 1,
            }
          : review
      )
    );
  };

  if (!vendor) return notFound();

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <Link
          href="/vendors"
          className="flex items-center hover:text-gray-800 hover:underline transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Vendors
        </Link>
        <span className="mx-2">/</span>
        <span className="font-semibold text-gray-800">{vendor.name}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Left Column - Images and Description */}
        <div>
          <ImageGallery images={vendor.images} />
        </div>

        {/* Right Column - Vendor Info and Actions */}
        <div>
          <div className="sticky top-4">
            <div className="bg-white p-4">
              <h1 className="text-semibold text-xl text-gray-900 font-bold flex items-center gap-1">
                {vendor.name}
                {vendor.verified && (
                  <span className="text-[#0e7b33]">
                    <CheckCircle className="w-5 h-5" />
                  </span>
                )}
              </h1>
              <h2 className="text-gray-700 font-semibold">
                {vendor.price} per day
              </h2>
              <div className="flex items-center mb-4">
                <span className="text-[#c96fff]  flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const starValue = i + 1;
                    return (
                      <span key={i} className="relative">
                        {/* Base empty star */}
                        <span className="text-[#c96fff]/30">★</span>
                        {/* Filled portion */}
                        {vendor.rating >= starValue ? (
                          <span className="absolute inset-0 text-[#c96fff]">
                            ★
                          </span>
                        ) : vendor.rating >= starValue - 0.5 ? (
                          <span className="absolute inset-0 text-[#c96fff] w-1/2 overflow-hidden">
                            ★
                          </span>
                        ) : null}
                      </span>
                    );
                  })}
                  <span className="ml-1 text-gray-900 font-semibold">
                    {vendor.rating.toFixed(2)}
                  </span>
                </span>
                <span className="text-gray-500 ml-2 text-sm">
                  ({vendor.reviewCount} reviews)
                </span>
              </div>

              {/* Message Form */}
              <div className="mb-4 bg-[#f9f9f9] p-4 rounded-lg">
                <h3 className="text-gray-600 mb-2 text-sm font-semibold">
                  Send vendor a message
                </h3>
                <div className="relative flex items-center">
                  <textarea
                    className="w-full p-3 bg-[#f2f2f2] rounded text-gray-500 text-sm pr-16 resize-none h-10"
                    placeholder="Type your message..."
                    rows={1}
                  />
                  <button className="absolute right-3 bg-[#ebecee] text-gray-400 text-sm py-1 px-4 rounded-full hover:bg-[#c96fff] transition-colors">
                    Send
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 mb-4">
                {/* Book Now Button */}
                <Link
                  href={`/vendors/view/${vendor.id}/book-now`}
                  className="w-full py-[7px] px-4 rounded-full text-center font-medium transition-all duration-300 relative overflow-hidden border border-[#6946e2] bg-white group"
                >
                  <span className="relative z-10 bg-clip-text text-sm font-semibold text-transparent bg-gradient-to-b from-[#6946e2] to-[#b868fa] group-hover:from-white group-hover:to-white/90">
                    Book now
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-b from-[#b868fa] to-[#6946e2] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
                </Link>

                {/* Make Offer Button */}
                <Link
                  href={`/vendors/view/${vendor.id}/make-offer`}
                  className="w-full py-[7px] px-4 rounded-full text-center font-medium transition-all duration-300 relative overflow-hidden border border-[#6946e2] bg-white group">
                  <span className="relative z-10 bg-clip-text text-sm font-semibold text-transparent bg-gradient-to-b from-[#6946e2] to-[#b868fa] group-hover:from-white group-hover:to-white/90">
                    Make an offer
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-b from-[#b868fa] to-[#6946e2] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
                </Link>

                {/* Message Button */}
                <button className="w-full py-[7px] px-4 rounded-full text-center font-medium transition-all duration-300 relative overflow-hidden border border-[#6946e2] bg-white group">
                  <span className="relative z-10 bg-clip-text text-sm font-semibold text-transparent bg-gradient-to-b from-[#6946e2] to-[#b868fa] group-hover:from-white group-hover:to-white/90">
                    Message
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-b from-[#b868fa] to-[#6946e2] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
                </button>
              </div>

              <div className="mt-4">
                <h2 className="text-gray-700 font-semibold mb-2 border-y-[1px] border-gray-200 pb-1 pt-3">
                  Description
                </h2>
                <p className="text-gray-800 text-sm">{vendor.description}</p>
              </div>

              <div className="mt-2">
                <h2 className="text-gray-800 font-semibold mb-2 pb-1 pt-3">
                  Reviews ({vendor.reviewCount})
                </h2>
                {reviews.length > 0 ? (
                  <>
                    {reviews.map((review) => (
                      <div key={review.id} className="border-t pt-4 pb-4">
                        <div className="flex flex-col items-start bg-[#f9f9f9] p-2 rounded-lg mb-2 w-full">
                          <div className="flex flex-row items-center mb-2 gap-2 ">
                            <Image
                              // src={review.userAvatar || "/noavatar.png"}
                              src="/noavatar.png"
                              alt="User Avatar"
                              width={40}
                              height={40}
                              className="w-7 h-7 rounded-full object-cover"
                            />
                            <div className="flex flex-col">
                              <div className="text-sm text-gray-900 font-semibold">
                                {review.userName}
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-800 text-sm mb-1 font-light">
                            {review.comment}
                          </p>
                        </div>
                        <div className="flex gap-2 items-center text-xs text-gray-500 pt-2">
                          <p className="text-xs text-gray-500">
                            {new Date(review.date).toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                          <div className="flex justify-center items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                          </div>
                          <button
                            className="flex items-center text-xs gap-1 hover:text-[#c96fff] transition-colors"
                            onClick={() => handleLikeClick(review.id)}
                          >
                            {review.isLiked ? (
                              <Heart className="w-4 h-4 fill-[#c96fff] text-[#c96fff]" />
                            ) : (
                              <p className="text-gray-500">Like</p>
                            )}
                            <span
                              className={
                                review.isLiked
                                  ? "text-[#c96fff]"
                                  : "text-gray-500"
                              }
                            >
                              {review.currentLikes}
                            </span>
                          </button>
                        </div>
                      </div>
                    ))}
                    <Link
                      href="#"
                      className=" bg-[#ebecee] rounded-xl w-full block text-center py-2.5 text-xs text-gray-500 font-semibold hover:bg-[#c96fff] hover:text-white transition-colors duration-300"
                    >
                      See all {vendor.reviewCount} reviews
                    </Link>
                  </>
                ) : (
                  <div className="border-t pt-4 text-sm text-gray-500">
                    No reviews yet. Be the first to review!
                  </div>
                )}
              </div>

              {/* Vendor Details */}
              <div className="space-y-4  pt-3">
                <div className="w-full">
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td className="py-2 align-top w-1/2">
                          <h3 className="font-semibold text-gray-900  mb-1 border-b border-gray-200 pb-2">
                            Company name
                          </h3>
                          <p className="text-gray-800 text-sm">
                            {vendor.companyName}
                          </p>
                          <p className="text-sm text-gray-800 mt-1">
                            ({vendor.businessNumber})
                          </p>
                        </td>
                        <td className="py-2 align-top pl-4">
                          <h3 className="font-semibold text-gray-900 mb-1 border-b border-gray-200 pb-2">
                            Service type
                          </h3>
                          <p className="text-gray-800 text-sm">
                            {vendor.category}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <h3 className="font-bold  text-gray-800 border-b border-gray-200 pb-2">
                    Store location
                  </h3>
                  <p className="text-gray-700 text-sm">
                    {vendor.storeLocation}
                  </p>
                  <p className="text-gray-400 text-sm">{vendor.storeAddress}</p>
                </div>

                {/* Map placeholder */}
                <div className="w-full h-[150px] sm:h-[200px] overflow-hidden rounded-lg shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.362974706922!2d3.3494461735047723!3d6.601734522252316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b9230fc4fc853%3A0xd8babb191dac2f6b!2sAllen%20Ave%2C%20Allen%2C%20Ikeja%20101233%2C%20Lagos!5e0!3m2!1sen!2sng!4v1729671204756!5m2!1sen!2sng"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>
                {vendor.verified && (
                  <div className="p-6 border border-gray-200 rounded-lg mt-4 shadow-sm">
                    <div className="flex flex-row items-center gap-2">
                      <div>
                        <CheckCircle className="w-5 h-5 text-[#0e7b33]" />
                      </div>
                      <div>
                        {" "}
                        <div className="flex items-center gap-2">
                          <span className="text-gray-800 font-bold">
                            Verified vendor
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          This vendor was verified on{" "}
                          {new Date(vendor.verifiedDate)
                            .toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            })
                            .replace(/\//g, "/")}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
