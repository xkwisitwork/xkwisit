import type { UtmBuildResult, UtmParams } from "../types";

export function parseUtmFromSearch(search: string): Partial<UtmParams> {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  return {
    source: params.get("utm_source") ?? undefined,
    medium: params.get("utm_medium") ?? undefined,
    campaign: params.get("utm_campaign") ?? undefined,
    term: params.get("utm_term") ?? undefined,
    content: params.get("utm_content") ?? undefined,
  };
}

export function buildUtmQuery(params: UtmParams): string {
  const q = new URLSearchParams();
  q.set("utm_source", params.source);
  q.set("utm_medium", params.medium);
  q.set("utm_campaign", params.campaign);
  if (params.term) q.set("utm_term", params.term);
  if (params.content) q.set("utm_content", params.content);
  return q.toString();
}

export function buildUtmResult(baseUrl: string, params: UtmParams): UtmBuildResult {
  const queryString = buildUtmQuery(params);
  const join = baseUrl.includes("?") ? "&" : "?";
  return {
    params,
    queryString,
    previewUrl: `${baseUrl}${join}${queryString}`,
  };
}

export function isValidUtm(params: Partial<UtmParams>): params is UtmParams {
  return Boolean(params.source && params.medium && params.campaign);
}
