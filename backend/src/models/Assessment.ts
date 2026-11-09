import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

export const ASSESSMENT_STATUSES = [
  "IN_PROGRESS",
  "SUBMITTED",
  "SCORED",
  "ARCHIVED",
] as const;

export type AssessmentStatus = (typeof ASSESSMENT_STATUSES)[number];

const answerSchema = new Schema(
  {
    questionId: { type: String, required: true },
    value: { type: Schema.Types.Mixed, required: true },
  },
  { _id: false },
);

const dimensionScoreSchema = new Schema(
  {
    dimension: { type: String, required: true },
    score: { type: Number, required: true },
    weight: { type: Number, required: true },
    label: { type: String, required: true },
  },
  { _id: false },
);

const assessmentSchema = new Schema(
  {
    token: { type: String, required: true, unique: true, index: true },
    businessName: { type: String, default: null },
    email: { type: String, default: null },
    status: {
      type: String,
      enum: ASSESSMENT_STATUSES,
      default: "IN_PROGRESS",
    },
    answers: { type: [answerSchema], default: [] },
    dimensionScores: { type: [dimensionScoreSchema], default: [] },
    overallScore: { type: Number, default: null },
    bandLabel: { type: String, default: null },
    summary: { type: String, default: null },
    roadmapItems: { type: [String], default: [] },
    orgId: { type: Schema.Types.ObjectId, ref: "Organization", default: null },
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    submittedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

export type AssessmentDocument = InferSchemaType<typeof assessmentSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Assessment: Model<AssessmentDocument> =
  mongoose.models.Assessment ??
  mongoose.model<AssessmentDocument>("Assessment", assessmentSchema);
