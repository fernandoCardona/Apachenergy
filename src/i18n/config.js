export const languages = {
  en: 'En',
  es: 'Es'
};

export const defaultLang = 'es';

export function getLangFromUrl(url) {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang;
  return defaultLang;
}

// Importamos todos los archivos JSON de manera estática
import esScreen1 from './lang/es/screen1.json';
import esScreen2 from './lang/es/screen2.json';
import esScreen3 from './lang/es/screen3.json';
import esScreen4 from './lang/es/screen4.json';
import esScreen5 from './lang/es/screen5.json';
import esScreen6 from './lang/es/screen6.json';
import esScreen7 from './lang/es/screen7.json';
import esScreen8 from './lang/es/screen8.json';
import esScreen9 from './lang/es/screen9.json';
import esScreen10 from './lang/es/screen10.json';
import esScreen11 from './lang/es/screen11.json';
import esScreen12 from './lang/es/screen12.json';
import esScreen13 from './lang/es/screen13.json';
import esScreen14 from './lang/es/screen14.json';
import esMenu from './lang/es/menu.json';

import enScreen1 from './lang/en/screen1.json';
import enScreen2 from './lang/en/screen2.json';
import enScreen3 from './lang/en/screen3.json';
import enScreen4 from './lang/en/screen4.json';
import enScreen5 from './lang/en/screen5.json';
import enScreen6 from './lang/en/screen6.json';
import enScreen7 from './lang/en/screen7.json';
import enScreen8 from './lang/en/screen8.json';
import enScreen9 from './lang/en/screen9.json';
import enScreen10 from './lang/en/screen10.json';
import enScreen11 from './lang/en/screen11.json';
import enScreen12 from './lang/en/screen12.json';
import enScreen13 from './lang/en/screen13.json';
import enScreen14 from './lang/en/screen14.json';
import enMenu from './lang/en/menu.json';

// Creamos mapas estáticos para las traducciones
const screenTranslations = {
  es: {
    screen1: esScreen1,
    screen2: esScreen2,
    screen3: esScreen3,
    screen4: esScreen4,
    screen5: esScreen5,
    screen6: esScreen6,
    screen7: esScreen7,
    screen8: esScreen8,
    screen9: esScreen9,
    screen10: esScreen10,
    screen11: esScreen11,
    screen12: esScreen12,
    screen13: esScreen13,
    screen14: esScreen14
  },
  en: {
    screen1: enScreen1,
    screen2: enScreen2,
    screen3: enScreen3,
    screen4: enScreen4,
    screen5: enScreen5,
    screen6: enScreen6,
    screen7: enScreen7,
    screen8: enScreen8,
    screen9: enScreen9,
    screen10: enScreen10,
    screen11: enScreen11,
    screen12: enScreen12,
    screen13: enScreen13,
    screen14: enScreen14
  }
};

const menuTranslations = {
  es: esMenu,
  en: enMenu
};

export function useTranslations(lang) {
  return function t(key) {
    try {
      const [screenKey, translationKey] = key.split('.');
      const langData = screenTranslations[lang] || screenTranslations[defaultLang];
      const screenData = langData[screenKey] || {};
      return screenData[translationKey] || key;
    } catch (e) {
      return key;
    }
  };
}

export function useMenuTranslations(lang) {
  try {
    return menuTranslations[lang] || menuTranslations[defaultLang] || {};
  } catch (e) {
    return {};
  }
}