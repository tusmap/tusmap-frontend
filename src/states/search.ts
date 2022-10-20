import { atom } from 'recoil';

export interface Place {
  buildingName: string;
  addressName: string;
  x: number;
  y: number;
}

export const originAtom = atom<Place | null>({
  key: 'OriginResult',
  default: null,
});

export const destinationAtom = atom<Place | null>({
  key: 'DestinationResult',
  default: null,
});
