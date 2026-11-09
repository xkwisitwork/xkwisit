import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectForm } from "@/features/projects";

export const metadata = { title: "New project" };

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[{ label: "Projects", href: "/projects" }, { label: "New project" }]}
        />
        <PageHeader title="New project" description="Start a new engagement." />
      </div>

      <ProjectForm mode="create" clients={[]} cancelHref="/projects" />
    </div>
  );
}
