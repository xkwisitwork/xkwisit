import {
  FrameColumns,
  FrameHero,
  FramePage,
  FrameStage,
} from "@/components/marketing/frames/SiteFrames";
import { CrmAutomationStudio } from "@/components/marketing/pages/service-detail/CrmAutomationStudio";
import { ServiceDetailBody } from "@/components/marketing/pages/service-detail/ServiceDetailBody";
import { SERVICE_CATEGORY_LABELS, type Service } from "@/config/services";
import { ROUTES } from "@/config/site";

/**
 * CRM & Automation service page.
 * Keeps the shared marketing hero; everything below is a dedicated pipeline studio.
 */
export function CrmAutomationView({ service }: { service: Service }) {
  const category = SERVICE_CATEGORY_LABELS[service.category];
  const price = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: service.currency,
    maximumFractionDigits: 0,
  }).format(service.startingFrom);

  return (
    <div className="bg-white text-[#16024A]">
      <FrameStage
        label={service.popular ? `${category} · Popular` : category}
        caption={service.tagline}
      >
        <FrameColumns>
          <FramePage>
            <FrameHero
              eyebrow={category}
              title={service.name}
              description={service.description}
              primaryHref={ROUTES.book}
              primaryLabel="Book a strategy call"
              secondaryHref={ROUTES.services}
              secondaryLabel="All services"
              image="/images/levers/sales-pipeline.jpg"
              imageAlt="Sales pipeline"
              stats={[
                { value: price, label: "Starting from" },
                { value: "90 days", label: "Block" },
              ]}
              names={service.deliverables}
            />
          </FramePage>
        </FrameColumns>
      </FrameStage>

      <CrmAutomationStudio
        currency={service.currency}
        startingFrom={service.startingFrom}
        deliverables={service.deliverables}
        goodFor={service.goodFor}
        notFor={service.notFor}
        outcomes={service.outcomes}
        idealFor={service.idealFor}
        tagline={service.tagline}
        name={service.name}
      />
      <ServiceDetailBody serviceName={service.name} category={category} />
    </div>
  );
}
