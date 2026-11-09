import { emailService } from "../../services/email.service.js";
export const resendClient = {
  send: emailService.send,
};
