import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// استيراد الملفات من الفولدر اللي عملناه
import enTranslation from "./locales/en.json";
import arTranslation from "./locales/ar.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      ar: { translation: arTranslation },
    },
    lng: "en", // اللغة المبدئية
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;