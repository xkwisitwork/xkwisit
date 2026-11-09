import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

export const MEMBERSHIP_ROLES = ["OWNER", "ADMIN", "MEMBER"] as const;
export type MembershipRole = (typeof MEMBERSHIP_ROLES)[number];

const membershipSchema = new Schema(
  {
    orgId: { type: Schema.Types.ObjectId, ref: "Organization", required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    role: { type: String, enum: MEMBERSHIP_ROLES, default: "MEMBER" },
  },
  { timestamps: true },
);

membershipSchema.index({ orgId: 1, userId: 1 }, { unique: true });

export type MembershipDocument = InferSchemaType<typeof membershipSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Membership: Model<MembershipDocument> =
  mongoose.models.Membership ??
  mongoose.model<MembershipDocument>("Membership", membershipSchema);
