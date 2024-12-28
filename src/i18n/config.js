import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Initial empty resources
const resources = {
  en: {
    translation: {},
  },
  ar: {
    translation: {},
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    load: "languageOnly",
    debug: process.env.NODE_ENV === "development",
  });

// Function to update translations dynamically
export const updateTranslations = (newTranslations) => {
  Object.keys(newTranslations).forEach((lang) => {
    i18n.addResourceBundle(
      lang,
      "translation",
      newTranslations[lang].translation,
      true,
      true
    );
  });
};

export default i18n;
