
import UserListSkeleton from "@/components/UserInfo/UserListSkeleton";
import UsersPageClient from "@/components/UserInfo/UsersPageClient";

export default function UsersPage() {
  const isLoading = false; // replace with real loading state

  return isLoading ? <UserListSkeleton /> : <UsersPageClient />;
}

