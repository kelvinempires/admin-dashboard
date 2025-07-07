// app/(dashboard)/users/[id]/page.tsx
import { Suspense } from "react";
import UserDetailPageClient from "@/components/UserDetailPageClient";
import UserDetailSkeleton from "@/components/UserDetailSkeleton";

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>; // 👈 Make params a Promise
}) {
  const { id } = await params; // 👈 Await the params

  return (
    <Suspense fallback={<UserDetailSkeleton />}>
      <UserDetailPageClient userId={id} />
    </Suspense>
  );
}
