import { atom } from 'recoil';

export const idAtom = atom<string>({
  key: 'id',
  default: '',
});
