import { atom } from 'recoil';

interface Place {
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
