// app/vendors/categories/[category]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { VendorCard } from "@/components/vendor/VendorCard";
import { vendors } from "@/lib/vendors";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const categoryName = params.category
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  const categoryVendors = vendors.filter(
    (vendor) => vendor.category.toLowerCase() === categoryName.toLowerCase()
  );

  if (categoryVendors.length === 0) return notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center text-sm text-gray-500 mb-4">
        <Link href="/vendors" className="hover:underline">
          Vendors
        </Link>
        <span className="mx-2">/</span>
        <span>{categoryName}</span>
      </div>

      <h1 className="text-3xl font-bold mb-6">{categoryName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryVendors.map((vendor) => (
          <Link
            key={vendor.id}
            href={`/vendors/view/${vendor.id}`}
            className="hover:no-underline"
          >
            <VendorCard vendor={vendor} />
          </Link>
        ))}
      </div>
    </div>
  );
}
