export const APP_LOCALES = [
  { code: "en", label: "English", native: "English", htmlLang: "en" },
  { code: "ig", label: "Igbo", native: "Igbo", htmlLang: "ig" },
  { code: "yo", label: "Yoruba", native: "Yorùbá", htmlLang: "yo" },
  { code: "pcm", label: "Pidgin", native: "Naija Pidgin", htmlLang: "pcm" },
  { code: "ha", label: "Hausa", native: "Hausa", htmlLang: "ha" },
  { code: "fr", label: "French", native: "Français", htmlLang: "fr" },
  { code: "zh", label: "Chinese", native: "中文", htmlLang: "zh-CN" },
] as const;

export type AppLocale = (typeof APP_LOCALES)[number]["code"];

export const DEFAULT_LOCALE: AppLocale = "en";

export const LOCALE_STORAGE_KEY = "xkwisit-locale";

export function isAppLocale(value: string | null | undefined): value is AppLocale {
  return APP_LOCALES.some((locale) => locale.code === value);
}

/** MyMemory / common BCP-47 mapping for machine translation. */
export function translateTarget(locale: AppLocale): string {
  switch (locale) {
    case "zh":
      return "zh-CN";
    case "pcm":
      // Pidgin is rarely supported by MT engines; English base + pcm post-pass.
      return "en";
    default:
      return locale;
  }
}

export function localeMeta(code: AppLocale) {
  return APP_LOCALES.find((locale) => locale.code === code) ?? APP_LOCALES[0];
}
