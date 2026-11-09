export const pdfService = {
  async renderHtmlToPdf(html: string): Promise<Buffer> {
    // Placeholder PDF bytes — replace with a real renderer when needed.
    const text = `PDF placeholder\n\n${html.slice(0, 500)}`;
    return Buffer.from(text, "utf8");
  },
};
