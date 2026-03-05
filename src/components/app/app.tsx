import { useEffect } from 'react';
import { useDispatch } from '../../services/store'; // Проверьте правильность пути до вашего стора
import { checkUserAuth } from '../../services/slices/userSlice';

import '../../index.css';
import styles from './app.module.css';
import { AppHeader } from '@components';
import { Outlet } from 'react-router-dom';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Проверяем авторизацию при запуске приложения
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Outlet />
    </div>
  );
};

export default App;
