import { ROUTES } from '@/constants';
import { useNavigate } from 'react-router-dom';
import { Container, Input, SearchBtn } from './styled';

export const TopSearchBar: React.FC = () => {
  const goto = useNavigate();

  const gotoSearchPage = () => {
    goto(ROUTES.SEARCH);
  }

  return (
    <Container>
      <Input type="text" placeholder="검색어를 입력해주세요" onFocus={gotoSearchPage} />
      <SearchBtn onClick={gotoSearchPage}>검색</SearchBtn>
    </Container>
  );
};
