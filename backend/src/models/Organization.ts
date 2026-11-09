import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

export const ORG_PLANS = ["STARTER", "GROWTH", "SCALE", "ENTERPRISE"] as const;
export type OrgPlan = (typeof ORG_PLANS)[number];

export const ORG_STATUSES = [
  "TRIAL",
  "ACTIVE",
  "PAST_DUE",
  "SUSPENDED",
  "CANCELLED",
] as const;
export type OrgStatus = (typeof ORG_STATUSES)[number];

const TRIAL_DAYS = 14;

export function defaultTrialWindow(from = new Date()) {
  const trialStartsAt = from;
  const trialEndsAt = new Date(from.getTime() + TRIAL_DAYS * 24 * 60 * 60 * 1000);
  return { trialStartsAt, trialEndsAt };
}

const organizationSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: String, enum: ORG_PLANS, default: "GROWTH" },
    status: { type: String, enum: ORG_STATUSES, default: "TRIAL" },
    trialStartsAt: { type: Date, default: null },
    trialEndsAt: { type: Date, default: null },
    seatsIncluded: { type: Number, default: 5 },
  },
  { timestamps: true },
);

export type OrganizationDocument = InferSchemaType<typeof organizationSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Organization: Model<OrganizationDocument> =
  mongoose.models.Organization ??
  mongoose.model<OrganizationDocument>("Organization", organizationSchema);

export { TRIAL_DAYS };
