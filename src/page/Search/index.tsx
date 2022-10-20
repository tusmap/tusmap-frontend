import { arrow, close } from '@/assets';
import { originAtom, Place } from '@/states';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Container, Input, InputBox, Logo, SearchBox } from './styled';

export const Search: React.FC = () => {
  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);

  const [origin, setOrigin] = useRecoilState(originAtom);
  const [originPlace, setOriginPlace] = useState<Place | null>();
  const [destinationPlace, setDestinationPlace] = useState<Place | null>();

  useEffect(() => {
    if (origin) {
      setOriginPlace(origin);
      destinationRef.current?.focus();
    } else {
      originRef.current?.focus();
    }
  }, []);

  const changePlace = () => {
    setOriginPlace(destinationPlace);
    setDestinationPlace(originPlace);
  };
  const clearInput = () => {
    setOriginPlace(null);
    setDestinationPlace(null);
  };

  return (
    <Container>
      <SearchBox>
        <Logo src={arrow} onClick={changePlace} />
        <InputBox>
          <Input
            type="text"
            ref={originRef}
            placeholder="출발지"
            defaultValue={originPlace?.buildingName || ''}
          />
          <Input
            type="text"
            ref={destinationRef}
            placeholder="도착지"
            defaultValue={destinationPlace?.buildingName || ''}
          />
        </InputBox>
        <Logo src={close} onClick={clearInput} />
      </SearchBox>
    </Container>
  );
};
