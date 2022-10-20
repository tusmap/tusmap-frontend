import { Container, Input, SearchBtn } from './styled';

export const TopSearchBar: React.FC = () => {
  return (
    <Container>
      <Input type="text" placeholder="검색어를 입력해주세요" />
      <SearchBtn>검색</SearchBtn>
    </Container>
  );
};
