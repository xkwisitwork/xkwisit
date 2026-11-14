import type { AppLocale } from "./locales";

/** BCP-47 tags for speech recognition + browser TTS. */
export function speechLangForLocale(locale: AppLocale): string {
  switch (locale) {
    case "fr":
      return "fr-FR";
    case "zh":
      return "zh-CN";
    case "ig":
      return "ig-NG";
    case "yo":
      return "yo-NG";
    case "ha":
      return "ha-NG";
    case "pcm":
      return "en-NG";
    case "en":
    default:
      return "en-NG";
  }
}

/**
 * Microsoft Edge neural voices (edge-tts).
 * African languages without a native neural voice use Nigerian English
 * as a fluent carrier for the already-translated text.
 */
export function edgeVoiceForLocale(locale: AppLocale): string {
  switch (locale) {
    case "fr":
      return "fr-FR-HenriNeural";
    case "zh":
      return "zh-CN-YunxiNeural";
    case "ig":
      // Prefer Igbo if the runtime has it; Abeo remains a safe fluent fallback.
      return "en-NG-AbeoNeural";
    case "yo":
      return "en-NG-AbeoNeural";
    case "ha":
      return "en-NG-AbeoNeural";
    case "pcm":
    case "en":
    default:
      return "en-NG-AbeoNeural";
  }
}

/** Google Translate TTS language tag (fallback when Edge voice fails). */
export function googleTtsLang(locale: AppLocale): string {
  switch (locale) {
    case "fr":
      return "fr";
    case "zh":
      return "zh-CN";
    case "ig":
      return "ig";
    case "yo":
      return "yo";
    case "ha":
      return "ha";
    case "pcm":
      return "en";
    case "en":
    default:
      return "en";
  }
}
