const store = new Map<string, Record<string, unknown>>();

export const dealsRepository = {
  async findAll() {
    return [...store.values()];
  },
  async findById(id: string) {
    return store.get(id) ?? null;
  },
  async save(id: string, value: Record<string, unknown>) {
    store.set(id, value);
    return value;
  },
  async delete(id: string) {
    return store.delete(id);
  },
};
