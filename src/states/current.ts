import { atom } from 'recoil';

export const currentLocAtom = atom<Array<number> | null>({
  key: 'currentLoc',
  default: null
});
