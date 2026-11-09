import "dotenv/config";
import mongoose from "mongoose";

function buildRoles(membershipRole, isPlatformAdmin) {
  if (isPlatformAdmin) {
    if (membershipRole === "OWNER" || membershipRole === "ADMIN") {
      return ["SUPER_ADMIN", "AGENCY_MANAGER"];
    }
    return ["SUPER_ADMIN"];
  }
  if (membershipRole === "OWNER" || membershipRole === "ADMIN") {
    return ["AGENCY_MANAGER"];
  }
  if (membershipRole === "VIEWER") return ["CLIENT_VIEWER"];
  return ["STRATEGIST"];
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || "xkwisit";

if (!uri) {
  console.error("MONGODB_URI missing");
  process.exit(1);
}

await mongoose.connect(uri, { dbName, serverSelectionTimeoutMS: 15000 });
console.log(`[backfill] db=${mongoose.connection.name} host=${mongoose.connection.host}`);

const users = mongoose.connection.db.collection("users");
const memberships = mongoose.connection.db.collection("memberships");

const all = await users.find({}).toArray();
let updated = 0;

for (const u of all) {
  const mem = await memberships.findOne({ userId: u._id });
  const membershipRole = mem?.role || u.membershipRole || "MEMBER";
  const isPlatformAdmin = Boolean(u.isPlatformAdmin);
  const roles = buildRoles(membershipRole, isPlatformAdmin);

  const needsUpdate =
    !Array.isArray(u.roles) ||
    u.roles.length === 0 ||
    u.membershipRole !== membershipRole ||
    JSON.stringify(u.roles) !== JSON.stringify(roles);

  if (!needsUpdate) {
    console.log(`ok  ${u.email} roles=${roles.join(",")} membershipRole=${membershipRole}`);
    continue;
  }

  await users.updateOne(
    { _id: u._id },
    { $set: { roles, membershipRole } },
  );
  updated += 1;
  console.log(`set ${u.email} roles=${roles.join(",")} membershipRole=${membershipRole}`);
}

console.log(`[backfill] done updated=${updated} total=${all.length}`);
await mongoose.disconnect();
