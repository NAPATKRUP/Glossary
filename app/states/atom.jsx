import { atom } from 'recoil';
import * as Localization from 'expo-localization';

const DefaultLocate = Localization.locale;

export const Locate = atom({
  key: 'LocateData',
  default: DefaultLocate,
});

export const Search = atom({
  key: 'SearchData',
  default: false,
});

export const CreateRefresh = atom({
  key: 'CreateRefreshData',
  default: false,
});

export default 'atom';
