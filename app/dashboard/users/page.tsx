
import UserListSkeleton from "@/components/UserListSkeleton";
import UsersPageClient from "@/components/UsersPageClient";

export default function UsersPage() {
  const isLoading = false; // replace with real loading state

  return isLoading ? <UserListSkeleton /> : <UsersPageClient />;
}

