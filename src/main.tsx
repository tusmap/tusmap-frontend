import { BrowserRouter, Route, Routes, useLocation, useSearchParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import React, { FunctionComponent, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import { globalCss } from '#/stitches.config';
import { Main, Search } from '@/page';
import { ROUTES } from './constants';
import { NavigationBar } from './components/Navigation';
import { io } from 'socket.io-client';
// import './asset/numericalGlyph/index.css';
// import { ModalPlaceholder } from './component';

globalCss({
  '@import': [
    'https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css',
  ],
  ':root': {
    'fontSize': '6px',
    '--toastify-font-family': 'Pretendard',
  },
  'body': {
    fontSize: '4rem',
    fontFamily: 'Pretendard',
    margin: '0px',
    overflow: 'hidden',
  },
  'button': {
    fontFamily: 'Pretendard',
  },
  '*': {
    wordBreak: 'keep-all',
    userSelect: 'none',
    boxSizing: 'border-box',
  },
})();

const pages: Record<ROUTES, FunctionComponent> = {
  [ROUTES.ROOT]: Main,
  [ROUTES.SEARCH]: Search,
};


const AnimatedRouter = () => {
  const location = useLocation();

  return (
    <>
      <ToastContainer />
      <Routes location={location}>
        {Object.entries(pages).map(([route, Component]) => (
          <Route key={route} path={route} element={<Component />} />
        ))}
      </Routes>
      <NavigationBar />
    </>
  );
};

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <AnimatedRouter />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);
