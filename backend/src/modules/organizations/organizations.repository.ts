import { Organization } from "../../models/Organization.js";
import { Membership } from "../../models/Membership.js";

export const organizationsRepository = {
  findById(id: string) {
    return Organization.findById(id);
  },
  findMemberships(orgId: string) {
    return Membership.find({ orgId });
  },
};
