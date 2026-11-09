import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { CampaignForm } from "@/features/campaigns";

export const metadata = { title: "New campaign" };

export default function NewCampaignPage() {
  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[{ label: "Campaigns", href: "/campaigns" }, { label: "New campaign" }]}
        />
        <PageHeader
          title="New campaign"
          description="Launch a new acquisition campaign."
        />
      </div>

      <CampaignForm mode="create" clients={[]} cancelHref="/campaigns" />
    </div>
  );
}
