export const languages = {
  es: 'Es',
  en: 'En'
};

export const defaultLang = 'es';

export const orderedLanguages = Object.entries(languages);

// Añadir códigos de idioma para hreflang
export const languageCodes = {
  es: 'es-ES',
  en: 'en-US'
};

export function getLangFromUrl(url) {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang;
  return defaultLang;
}

export function useTranslations(lang) {
  return function t(key) {
    const translations = {
      es: {
        'nav.home': 'Inicio',
        'nav.about': 'Sobre Nosotros',
        'nav.contact': 'Contacto'
      },
      en: {
        'nav.home': 'Home',
        'nav.about': 'About Us',
        'nav.contact': 'Contact'
      }
    };

    const langTranslations = translations[lang] || translations[defaultLang];
    return langTranslations[key] || key;
  };
}