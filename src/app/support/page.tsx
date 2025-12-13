import PageHeader from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SupportPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader
        title="Support"
        description="Get help and support."
      />
      <Card>
        <CardHeader>
          <CardTitle>Under Construction</CardTitle>
          <CardDescription>
            This page is currently under development. Check back later for support features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Future features will include a knowledge base, FAQs, and a contact form to reach our support team.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
