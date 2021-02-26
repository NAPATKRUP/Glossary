import { atom } from 'recoil';

export const IsLogin = atom({
  key: 'IsLogin',
  default: false,
});

export const UserID = atom({
  key: 'UserID',
  default: null,
});

export const UserName = atom({
  key: 'UserName',
  default: null,
});

export const UserPicture = atom({
  key: 'UserPicture',
  default: null,
});

export default 'auth';
