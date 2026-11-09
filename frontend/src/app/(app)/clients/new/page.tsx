import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { ClientForm } from "@/features/clients";

export const metadata = { title: "New client" };

export default function NewClientPage() {
  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[{ label: "Clients", href: "/clients" }, { label: "New client" }]}
        />

        <PageHeader title="New client" description="Add a business to the platform." />
      </div>

      <ClientForm mode="create" cancelHref="/clients" />
    </div>
  );
}
