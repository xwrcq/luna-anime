import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useAppSelector } from './store';
import { authRoutes, noAuthRoutes } from './routes';

function App() {
  const user = useAppSelector(state => state.authSlice.user);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className='flex flex-col h-full sm:w-5/6 mx-auto bg-light-400 dark:bg-dark-200 dark:text-light-400'>
        <Navbar isBurgerOpen={isBurgerOpen} setIsBurgerOpen={setIsBurgerOpen} />
        <div className={`mt-12 bg-light-400 dark:bg-dark-200 ${isBurgerOpen ? 'overflow-hidden' : 'overflow-auto'}`}>
          <Routes>
            {user ?
              authRoutes.map(({ path, Element }) =>
                <Route key={path} path={path} element={Element} />
              )
              :
              noAuthRoutes.map(({ path, Element }) =>
                <Route key={path} path={path} element={Element} />
              )
            }
            <Route path='*' element={<Navigate to={'/'} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;