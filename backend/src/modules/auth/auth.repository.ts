import { User } from "../../models/User.js";

export const authRepository = {
  findByEmail(email: string) {
    return User.findOne({ email: email.toLowerCase() });
  },
  findById(id: string) {
    return User.findById(id);
  },
};
