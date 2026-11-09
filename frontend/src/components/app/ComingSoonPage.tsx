import { ModuleWorkspace } from "./ModuleWorkspace";

export type ComingSoonPageProps = {
  title: string;
  description?: string;
  crumbs?: string[];
  primaryHref?: string;
  primaryLabel?: string;
};

/**
 * @deprecated Prefer ModuleWorkspace. Kept as a thin alias so old imports still resolve.
 */
export function ComingSoonPage({
  title,
  description = "Operate this module inside your Xkwisit workspace.",
  crumbs,
  primaryHref = "/dashboard",
  primaryLabel = "Open workspace",
}: ComingSoonPageProps) {
  return (
    <ModuleWorkspace
      title={title}
      description={description}
      crumbs={crumbs}
      primaryHref={primaryHref}
      primaryLabel={primaryLabel}
      stats={[
        { label: "Ready", value: "-", hint: "No sample data", tone: "muted" },
        { label: "Records", value: 0, hint: "Empty", tone: "info" },
        { label: "Owners", value: 0, hint: "Unassigned", tone: "muted" },
        { label: "Attention", value: 0, hint: "Clear", tone: "success" },
      ]}
      filters={["Active", "Pending", "Done"]}
      columns={[
        { key: "name", label: "Item" },
        { key: "status", label: "Status" },
        { key: "owner", label: "Owner" },
        { key: "updated", label: "Updated" },
      ]}
      rows={[]}
    />
  );
}
