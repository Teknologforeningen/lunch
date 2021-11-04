import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  eng: {
    translation: {
      "Announcements": "Announcements",
      "OpenHours": "Open Hours",
      "today": "Today",
      "week": "Week",
      "menu": "Menu",
      "posts": "Posts",
      "prices": "Prices",
      "description": "Name",
      "studentprice": "Student Price",
      "normalprice": "Normal Price",
      "ContactUs": "Contact us",
      "Info": "Information"
    }
  },
  swe: {
    translation: {
      "Announcements": "Meddelanden",
      "OpenHours": "Öppettider",
      "today": "Idag",
      "week": "Vecka",
      "menu": "Meny",
      "posts": "Artiklar",
      "prices": "Prislista",
      "description": "Namn",
      "studentprice": "Studerandepris",
      "normalprice": "Normalt Pris",
      "ContactUs": "Ta kontakt",
      "Info": "Information"
    }
  },
  fin: {
    translation: {
      "Announcements": "Ilmoitukset",
      "OpenHours": "Aukioloajat",
      "today": "Tänään",
      "week": "Viikko",
      "menu": "Ruokalista",
      "posts": "Artikkelit",
      "prices": "Hinnasto",
      "description": "Nimi",
      "studentprice": "Opiskelijahinta",
      "normalprice": "Normaali Hinta",
      "ContactUs": "Ota yhteyttä",
      "Info": "Informaatio"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "eng",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;