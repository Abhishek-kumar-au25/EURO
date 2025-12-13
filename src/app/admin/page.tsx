import PageHeader from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Admin"
        description="Manage admin users and permissions."
      />
      <Card>
        <CardHeader>
          <CardTitle>Under Construction</CardTitle>
          <CardDescription>
            This page is currently under development. Check back later for admin management features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Future features will include creating, editing, and managing admin user roles and permissions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
