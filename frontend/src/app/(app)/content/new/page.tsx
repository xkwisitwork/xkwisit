import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContentForm } from "@/features/content";

export const metadata = { title: "New content" };

export default function NewContentPage() {
  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[{ label: "Content", href: "/content" }, { label: "New content" }]}
        />
        <PageHeader
          title="New content"
          description="Start a piece in the production pipeline."
        />
      </div>

      <ContentForm mode="create" clients={[]} cancelHref="/content" />
    </div>
  );
}
