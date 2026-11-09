/**
 * Email send scaffold.
 */
export type SendEmailInput = {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
};

export async function sendEmail(input: SendEmailInput): Promise<{ id: string }> {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug("[email:send]", input);
  }
  return { id: `dev_${Date.now()}` };
}
