import { arrow, close } from '@/assets';
import { ROUTES } from '@/constants';
import { destinationAtom, idAtom, originAtom, Place } from '@/states';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  Container,
  Input,
  InputBox,
  Logo,
  SearchBox,
  SearchResultBox,
  SearchResultContainer,
  SearchResultDesc,
  SearchResultTitle,
} from './styled';

interface searchPlace {
  address_name: string;
  id: string;
  place_name: string;
  x: string;
  y: string;
}

export const Search: React.FC = () => {
  const goto = useNavigate();

  const { kakao } = window as any;
  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);

  const id = useRecoilValue(idAtom);

  const [originPlace, setOriginPlace] = useRecoilState(originAtom);
  const [destinationPlace, setDestinationPlace] =
    useRecoilState(destinationAtom);

  const [originKeyword, setOriginKeyword] = useState<string>();
  const [destinationKeyword, setDestinationKeyword] = useState<string>();

  const [originSuccess, setOriginSuccess] = useState<boolean>(false);
  const [destinationSuccess, setDestinationSuccess] = useState<boolean>(false);

  const [searchResults, setSearchResults] =
    useState<Array<React.ReactElement>>();

  const [isResult, setIsResult] = useState<boolean>(false);

  const ps = new kakao.maps.services.Places();

  const searchPlace = (keyword: string, fn: Function) => {
    ps.keywordSearch(
      keyword,
      (data: Array<searchPlace>, status: any, pagination: any) => {
        if (status === kakao.maps.services.Status.OK) {
          fn(data);
        }
      }
    );
  };

  useEffect(() => {
    if (destinationPlace) setDestinationKeyword(destinationPlace.buildingName);
    if (originPlace) {
      setOriginKeyword(originPlace.buildingName);
      setOriginSuccess(true);
      destinationRef.current?.focus();
    } else originRef.current?.focus();
  }, []);

  useEffect(() => {
    if (originSuccess && destinationSuccess) {
      setIsResult(true);
    }
  }, [originSuccess, destinationSuccess]);
  useEffect(() => {
    if (originPlace && destinationPlace && isResult) {
      goto(`${ROUTES.ROOT}?id=${id}`);
    }
  }, [originPlace, destinationPlace, isResult]);

  useEffect(() => {
    if (!originKeyword) {
      setSearchResults([]);
      return;
    }
    searchPlace(originKeyword!, (data: Array<searchPlace>) => {
      if (originSuccess) return;
      setSearchResults(
        data.map((e, idx) => (
          <SearchResultBox
            key={idx}
            onClick={() => {
              setOriginPlace({
                addressName: e.address_name,
                buildingName: e.place_name,
                x: +e.x,
                y: +e.y,
              });
              setOriginKeyword(e.place_name);
              setSearchResults([]);
              setOriginSuccess(true);
              destinationRef.current?.focus();
            }}
          >
            <SearchResultTitle>{e.place_name}</SearchResultTitle>
            <SearchResultDesc>{e.address_name}</SearchResultDesc>
          </SearchResultBox>
        ))
      );
    });
  }, [originKeyword, originSuccess]);
  useEffect(() => {
    if (!destinationKeyword) {
      setSearchResults([]);
      return;
    }
    searchPlace(destinationKeyword!, (data: Array<searchPlace>) => {
      if (destinationSuccess) return;
      setSearchResults(
        data.map((e, idx) => (
          <SearchResultBox
            key={idx}
            onClick={() => {
              setDestinationPlace({
                addressName: e.address_name,
                buildingName: e.place_name,
                x: +e.x,
                y: +e.y,
              });
              setDestinationKeyword(e.place_name);
              setSearchResults([]);
              setDestinationSuccess(true);
            }}
          >
            <SearchResultTitle>{e.place_name}</SearchResultTitle>
            <SearchResultDesc>{e.address_name}</SearchResultDesc>
          </SearchResultBox>
        ))
      );
    });
  }, [destinationKeyword, destinationSuccess]);

  const changePlace = () => {
    setOriginPlace(destinationPlace);
    setDestinationPlace(originPlace);
    setOriginKeyword(destinationKeyword);
    setDestinationKeyword(originKeyword);
  };
  const clearInput = () => {
    setOriginPlace(null);
    setDestinationPlace(null);
    setOriginKeyword('');
    setDestinationKeyword('');
    setOriginSuccess(false);
    setDestinationSuccess(false);
    setSearchResults([]);
    setOriginPlace(null);
    setDestinationPlace(null);
    setIsResult(false);
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
            value={originKeyword}
            onChange={({ target: { value } }) => setOriginKeyword(value)}
            onFocus={() => setOriginSuccess(false)}
          />
          <Input
            type="text"
            ref={destinationRef}
            placeholder="도착지"
            value={destinationKeyword}
            onChange={({ target: { value } }) => setDestinationKeyword(value)}
            onFocus={() => setDestinationSuccess(false)}
          />
        </InputBox>
        <Logo src={close} onClick={clearInput} />
      </SearchBox>
      <SearchResultContainer>
        {isResult ? <div></div> : searchResults?.map((e) => e)}
      </SearchResultContainer>
    </Container>
  );
};
