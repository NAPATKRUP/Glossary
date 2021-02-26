import i18n from 'i18n-js';
import * as Localization from 'expo-localization';
import en from './en/translations.json';
import th from './th/translations.json';

i18n.translations = {
  en,
  th,
};

i18n.fallbacks = true;

i18n.defaultLocale = 'th-TH';

i18n.locale = Localization.locale;

export default i18n;
