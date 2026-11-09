import { LeadForm } from "@/features/leads";
import { PageHeader } from "@/components/layout/PageHeader";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata = { title: "New lead" };

export default function NewLeadPage() {
  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "CRM", href: "/crm" },
            { label: "Leads", href: "/crm/leads" },
            { label: "New lead" },
          ]}
        />

        <PageHeader title="New lead" description="Add a new prospect to the pipeline." />
      </div>

      <LeadForm mode="create" cancelHref="/crm/leads" />
    </div>
  );
}
