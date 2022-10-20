import { styled } from '#/stitches.config';

export const Container = styled('div', {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  background: '#F5F5F5',
  boxShadow: '0px 4px 4px rgba(196, 196, 196, 0.1)',
});

export const SearchBox = styled('div', {
  background: '#fff',
  width: '100%',
  padding: '12px 16px',
  display: 'flex',
  gap: '4px',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const InputBox = styled('div', {
  width: '80%',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});
export const Input = styled('input', {
  border: 'none',
  outline: 'none',
  background: '#F5F5F5',
  padding: '8px',
  fontSize: '2rem',
  borderRadius: '4px',
});

export const Logo = styled('img', {
  width: '24px',
  height: '24px',
});
