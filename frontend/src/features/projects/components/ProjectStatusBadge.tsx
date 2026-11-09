import { StatusBadge } from "@/components/ui/Badge";
import type { ProjectStatus } from "@/lib/constants/statuses";
import { projectStatusLabel, projectStatusTone } from "../utils/projectHealth";

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <StatusBadge tone={projectStatusTone(status)} dot>
      {projectStatusLabel(status)}
    </StatusBadge>
  );
}
