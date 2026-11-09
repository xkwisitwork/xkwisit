/**
 * Data layer - pipeline.
 */
export async function pipelineQuery(_params: Record<string, unknown> = {}) {
  return { rows: [] as unknown[], total: 0 };
}
