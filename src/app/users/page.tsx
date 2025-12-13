import PageHeader from "@/components/page-header";
import { users } from "@/lib/data";
import { UsersTable } from "@/components/users/users-table";

export default function AllUsersPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="All Users"
        description="View and manage all users in the system."
      />
      <UsersTable users={users} />
    </div>
  );
}
