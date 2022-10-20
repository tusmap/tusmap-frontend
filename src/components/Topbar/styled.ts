import { styled } from '#/stitches.config';

export const Container = styled('div', {
  width: '90%',
  height: '40px',
  position: 'absolute',
  left: '50%',
  transform: 'translate(-50%)',
  top: '20px',
  zIndex: 3,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const Input = styled('input', {
  width: '75%',
  height: '100%',
  outline: 'none',
  border: 'none',
  background: '#fff',
  borderRadius: '4px',
  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  padding: '0 10px',
});

export const SearchBtn = styled('div', {
  width: '20%',
  height: '100%',
  borderRadius: '4px',
  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  background: '$accent',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '2.5rem',
});
