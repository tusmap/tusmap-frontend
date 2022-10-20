import { styled } from '#/stitches.config';

export const Container = styled('div', {
  width: '90%',
  background: '#fff',
  borderRadius: '4px',
  boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  position: 'absolute',
  left: '50%',
  bottom: '16px',
  transform: 'translateX(-50%)',
  zIndex: 3,
});

export const ItemBox = styled('div', {
  height: '100%',
  width: '20%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '5px 0',
  gap: '4px',
  variants: {
    select: {
      true: {
        borderTop: '2px solid $accent',
      },
    },
  },
});

export const ItemIcn = styled('img', {
  width: '28px',
  height: '28px',
});

export const ItemName = styled('span', {
  fontSize: '2rem',
  variants: {
    select: {
      true: {
        color: '$accent',
      },
      false: {
        color: '$disabled',
      },
    },
  },
});
