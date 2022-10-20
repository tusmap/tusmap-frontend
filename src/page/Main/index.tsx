import { useEffect, useRef, useState } from 'react';
import { Container, Map } from './styled';
import { io } from 'socket.io-client';
import { TopSearchBar } from '@/components';
import { useSetRecoilState } from 'recoil';
import { originAtom, idAtom } from '@/states';

import LocationMarker from '@/assets/location.svg';
import { useSearchParams } from 'react-router-dom';

function aAlert(msg: string) {
  try {
    (window as any).appAlert.postMessage(msg);
  } catch (e) {
    alert(msg);
  }
}

const socket = io(import.meta.env.VITE_API_URL, { transports: ['websocket'] });

export const Main: React.FC = () => {
  const { kakao } = window as any;
  const containerRef = useRef<HTMLDivElement>(null);

  const setOrigin = useSetRecoilState(originAtom);
  const setId = useSetRecoilState(idAtom);
  const [currentLocationMarker, setCurrentLocationMarker] = useState<any>();
  const [destinationMarker, setDestinationMarker] = useState<any>();
  const [maps, setMap] = useState<any>();
  const [currentLoc, setCurrentLoc] = useState<Array<number>>([]);
  const geocoder = new kakao.maps.services.Geocoder();

  const id = useSearchParams()[0].get('id');

  function drawPolyLine(data: { result: { lane: any } }) {
    let lineArray;

    for (let i of data.result.lane) {
      for (let j of i.section) {
        lineArray = null;
        lineArray = new Array();
        for (let k of j.graphPos) {
          lineArray.push(new kakao.maps.LatLng(k.y, k.x));
        }

        if (i.type == 1) {
          new kakao.maps.Polyline({
            map: maps,
            path: lineArray,
            strokeWeight: 3,
            strokeColor: '#003499',
          });
        } else if (i.type == 2) {
          new kakao.maps.Polyline({
            map: maps,
            path: lineArray,
            strokeWeight: 3,
            strokeColor: '#37b42d',
          });
        } else {
          new kakao.maps.Polyline({
            map: maps,
            path: lineArray,
            strokeWeight: 3,
          });
        }
      }
    }
  }

  function callMapObjApiAJAX(mapObj: any) {
    fetch(`${import.meta.env.VITE_API_URL}/api/loadLane`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mapObject: mapObj,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        drawPolyLine(data.data);
      });
  }

  useEffect(() => {
    const map = new (window as any).kakao.maps.Map(containerRef.current, {
      center: new kakao.maps.LatLng(37.342331, 126.830149),
      level: 3,
    });
    setMap(map);
    setId(id as string);
    socket.emit('join', id);
    socket.on('setPosition', (data) => {
      if (currentLocationMarker) currentLocationMarker.setMap(null);
      const imageSize = new kakao.maps.Size(26, 26);
      const imageOption = { offset: new kakao.maps.Point(13, 13) };

      const markerImage = new kakao.maps.MarkerImage(
        LocationMarker,
        imageSize,
        imageOption
      );
      const markerPosition = new kakao.maps.LatLng(
        data.latitude,
        data.longitude
      );
      setCurrentLoc([data.latitude, data.longitude]);

      const marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });

      map.panTo(new kakao.maps.LatLng(data.latitude, data.longitude));

      marker.setMap(map);
      setCurrentLocationMarker(marker);
    });
  }, []);

  useEffect(() => {
    const clickEvent = (mouseEvent: any) => {
      const latlng = mouseEvent.latLng;
      if (!destinationMarker) {
        const dm = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(latlng.getLat(), latlng.getLng()),
        });
        setDestinationMarker(dm);

        dm.setMap(maps);
      } else destinationMarker.setPosition(latlng);

      if (!currentLocationMarker)
        return aAlert('위치 실패/현재 위치 불러오기 실패');

      const currentPosition = currentLocationMarker.getPosition();

      fetch(`${import.meta.env.VITE_API_URL}/api/searchTransPath`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          SX: currentPosition.getLng(),
          SY: currentPosition.getLat(),
          EX: latlng.getLng(),
          EY: latlng.getLat(),
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.data.error) return aAlert(`오류/${data.data.error.msg}`);
          callMapObjApiAJAX(data.data['result']['path'][0].info.mapObj);
        })
        .catch((err) => aAlert(`오류/${err}`));
    };
    try {
      if (currentLocationMarker) {
        kakao.maps.event.removeListener(maps, 'click', clickEvent);
        kakao.maps.event.addListener(maps, 'click', clickEvent);

        geocoder.coord2Address(currentLoc[1], currentLoc[0], (result: any, status: any) => {
          if (status === kakao.maps.services.Status.OK) {
            geocoder.addressSearch(result[0].road_address.address_name, (nameResult: any, nameStatus: any) => {
              if (nameStatus === kakao.maps.services.Status.OK) {
                setOrigin({
                  addressName: result[0].road_address.address_name,
                  buildingName: result[0].road_address.building_name,
                  x: nameResult[0].x,
                  y: nameResult[0].y,
                })
              }
            });
          }
        });
      }
    } catch (e) {}
  }, [currentLocationMarker, maps, currentLoc]);

  return (
    <Container>
      <TopSearchBar />
      <Map ref={containerRef} />
    </Container>
  );
};
