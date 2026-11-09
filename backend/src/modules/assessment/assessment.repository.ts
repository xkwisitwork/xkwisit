import { Assessment } from "../../models/Assessment.js";

export const assessmentRepository = {
  findByToken(token: string) {
    return Assessment.findOne({ token });
  },
  findById(id: string) {
    return Assessment.findById(id);
  },
  list(limit = 50) {
    return Assessment.find().sort({ createdAt: -1 }).limit(limit);
  },
};
