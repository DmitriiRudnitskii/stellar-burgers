import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { checkUserAuth } from '../../services/slices/userSlice';
import { getIngredients } from '../../services/slices/ingridientsSlice';

import {
  ConstructorPage, Feed, Login, Register, ForgotPassword, ResetPassword,
  Profile, ProfileOrders, NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredients());
  }, [dispatch]);

  const closeModal = () => navigate(-1);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        
        <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
        <Route path='/register' element={<OnlyUnAuth component={<Register />} />} />
        <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPassword />} />} />
        <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPassword />} />} />

        <Route path='/profile' element={<OnlyAuth component={<Profile />} />} />
        <Route path='/profile/orders' element={<OnlyAuth component={<ProfileOrders />} />} />

        {/* Отдельные страницы для деталей, если открыты по прямой ссылке */}
        <Route path='/feed/:number' element={<div className={styles.detailPageWrap}><p className="text text_type_main-large">#{window.location.pathname.split('/').pop()}</p><OrderInfo /></div>} />
        <Route path='/ingredients/:id' element={<div className={styles.detailPageWrap}><p className="text text_type_main-large">Детали ингредиента</p><IngredientDetails /></div>} />
        <Route path='/profile/orders/:number' element={<OnlyAuth component={<div className={styles.detailPageWrap}><p className="text text_type_main-large">#{window.location.pathname.split('/').pop()}</p><OrderInfo /></div>} />} />
        
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route path='/feed/:number' element={
            <Modal title={`#${location.pathname.split('/').pop()}`} onClose={closeModal}><OrderInfo /></Modal>
          } />
          <Route path='/ingredients/:id' element={
            <Modal title='Детали ингредиента' onClose={closeModal}><IngredientDetails /></Modal>
          } />
          <Route path='/profile/orders/:number' element={
            <OnlyAuth component={<Modal title={`#${location.pathname.split('/').pop()}`} onClose={closeModal}><OrderInfo /></Modal>} />
          } />
        </Routes>
      )}
    </div>
  );
};

export default App;
