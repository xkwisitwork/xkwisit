import { notFound, notImplemented } from "../../../utils/errors.js";

const items: Array<Record<string, unknown>> = [];

export async function list(query: Record<string, unknown> = {}) {
  void query;
  return items;
}

export async function getById(id: string) {
  const hit = items.find((item) => String(item.id) === id);
  if (!hit) throw notFound("experiments not found");
  return hit;
}

export async function create(input: Record<string, unknown>) {
  throw notImplemented("experiments.create");
}

export async function update(id: string, input: Record<string, unknown>) {
  void id;
  void input;
  throw notImplemented("experiments.update");
}

export async function remove(id: string) {
  void id;
  throw notImplemented("experiments.delete");
}
