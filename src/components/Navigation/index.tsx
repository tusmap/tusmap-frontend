import { Container, ItemBox, ItemIcn, ItemName } from './styled';

import { car, carAccent, map, mapAccent } from '@/assets';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { useRecoilValue } from 'recoil';
import { idAtom } from '@/states';

export const NavigationBar: React.FC = () => {
  const { pathname } = useLocation();
  const goto = useNavigate();
  const id = useRecoilValue(idAtom);

  return (
    <Container>
      <ItemBox select={pathname === ROUTES.ROOT} onClick={() => goto(`${ROUTES.ROOT}?id=${id}`)}>
        <ItemIcn src={pathname === ROUTES.ROOT ? mapAccent : map} />
        <ItemName select={pathname === ROUTES.ROOT}>주변</ItemName>
      </ItemBox>
      <ItemBox select={pathname === ROUTES.SEARCH} onClick={() => goto(ROUTES.SEARCH)}>
        <ItemIcn src={pathname === ROUTES.SEARCH ? carAccent : car} />
        <ItemName select={pathname === ROUTES.SEARCH}>길찾기</ItemName>
      </ItemBox>
    </Container>
  );
};
