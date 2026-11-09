export * from "./types";
export * from "./api";

export { useAnomalies, useAnomaly } from "./anomaly/hooks/useAnomalies";
export { AnomalyCard } from "./anomaly/components/AnomalyCard";
export { AnomalyFeed } from "./anomaly/components/AnomalyFeed";
export { AnomalyAlert } from "./anomaly/components/AnomalyAlert";
export { AnomalyDetail } from "./anomaly/components/AnomalyDetail";
export { anomalySeverityTone, formatDeltaPercent } from "./anomaly/utils/detectAnomaly";

export { useBottlenecks } from "./bottleneck/hooks/useBottlenecks";
export { BottleneckCard } from "./bottleneck/components/BottleneckCard";
export { BottleneckInvestigation } from "./bottleneck/components/BottleneckInvestigation";
export { BottleneckTimeline } from "./bottleneck/components/BottleneckTimeline";

export {
  useClientHealth,
  useGrowthOverview,
  useHealthTrend,
} from "./health/hooks/useClientHealth";
export { HealthScoreGrid } from "./health/components/HealthScoreGrid";
export { HealthTrend } from "./health/components/HealthTrend";
export { HealthDimension } from "./health/components/HealthDimension";
export {
  healthLabel,
  healthScoreTone,
  weightedHealthScore,
} from "./health/utils/clientHealthScore";

export { useRecommendations } from "./recommendations/hooks/useRecommendations";
export { NextBestActions } from "./recommendations/components/NextBestActions";
export { ActionCard } from "./recommendations/components/ActionCard";
export { ActionPriorityBadge } from "./recommendations/components/ActionPriorityBadge";
export { ActionReason } from "./recommendations/components/ActionReason";

export { useRevenueLeak } from "./revenue-leak/hooks/useRevenueLeak";
export { RevenueLeakDetector } from "./revenue-leak/components/RevenueLeakDetector";
export { LeakEvidenceList } from "./revenue-leak/components/LeakEvidenceList";
export { LeakStageComparison } from "./revenue-leak/components/LeakStageComparison";

export { useWhyDid } from "./why-did/hooks/useWhyDid";
export { WhyDidPanel } from "./why-did/components/WhyDidPanel";
export { WhyDidQuery } from "./why-did/components/WhyDidQuery";
export { WhyDidResult } from "./why-did/components/WhyDidResult";
export { ContributingFactor } from "./why-did/components/ContributingFactor";

export {
  useExperimentRegistry,
  useIntelExperiment,
} from "./experiments/hooks/useExperimentRegistry";
export { ExperimentRegistry } from "./experiments/components/ExperimentRegistry";
export { ExperimentCard } from "./experiments/components/ExperimentCard";
export { ExperimentHypothesis } from "./experiments/components/ExperimentHypothesis";
export { ExperimentResultPanel } from "./experiments/components/ExperimentResultPanel";
export { ExperimentDecision } from "./experiments/components/ExperimentDecision";

export { useAutopilotFeed, useAutopilotRules } from "./autopilot/hooks/useAutopilot";
export { AutopilotFeed } from "./autopilot/components/AutopilotFeed";
export { AutopilotRuleCard } from "./autopilot/components/AutopilotRuleCard";
export { AutopilotReview } from "./autopilot/components/AutopilotReview";
