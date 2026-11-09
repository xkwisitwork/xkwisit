export function renderBasicEmail(subject: string, body: string) {
  return { subject, html: `<p>${body}</p>`, text: body };
}
