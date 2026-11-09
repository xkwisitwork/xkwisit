import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

/**
 * App RBAC roles stored on the user document (visible in Compass).
 * Org-scoped OWNER/ADMIN/MEMBER still lives on Membership; this array is the
 * denormalized app role(s) used by the session/JWT layer.
 */
export const USER_ROLES = [
  "SUPER_ADMIN",
  "AGENCY_MANAGER",
  "STRATEGIST",
  "MARKETING_SPECIALIST",
  "DESIGNER",
  "DEVELOPER",
  "SALES",
  "CLIENT_ADMIN",
  "CLIENT_VIEWER",
] as const;

export type UserRole = (typeof USER_ROLES)[number];

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    /** Public profile image URL (UploadThing / CDN). */
    avatarUrl: { type: String, default: null, trim: true },
    phone: {
      type: String,
      default: null,
      trim: true,
      sparse: true,
      unique: true,
    },
    emailVerifiedAt: { type: Date, default: null },
    resetToken: { type: String, default: null },
    resetTokenExpiresAt: { type: Date, default: null },
    verifyToken: { type: String, default: null },
    /** Platform-level super admin (oversees all workspaces). */
    isPlatformAdmin: { type: Boolean, default: false },
    /**
     * App RBAC roles for this account (e.g. ["AGENCY_MANAGER"]).
     * Workspace membership role (OWNER/ADMIN/MEMBER) remains on Membership.
     */
    roles: {
      type: [
        {
          type: String,
          enum: USER_ROLES,
        },
      ],
      default: ["STRATEGIST"],
    },
    /** Denormalized primary org membership role for quick inspection. */
    membershipRole: {
      type: String,
      enum: ["OWNER", "ADMIN", "MEMBER", "VIEWER"],
      default: "MEMBER",
    },
    /** Failed password attempts since last successful login / lock clear. */
    failedLoginAttempts: { type: Number, default: 0 },
    /** How many times the account has been locked (escalates duration). */
    lockoutLevel: { type: Number, default: 0 },
    /** When set and in the future, login is blocked. */
    lockUntil: { type: Date, default: null },
  },
  { timestamps: true },
);

export type UserDocument = InferSchemaType<typeof userSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const User: Model<UserDocument> =
  mongoose.models.User ?? mongoose.model<UserDocument>("User", userSchema);
