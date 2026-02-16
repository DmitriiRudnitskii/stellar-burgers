import { ConstructorPage, Feed, Register, Login, ForgotPassword, ResetPassword, Profile, ProfileOrders, NotFound404 } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppHeader, Modal, OrderInfo, IngredientDetails,  } from '@components';
import { useDispatch } from '../../services/store';
import { getIngredients } from '../../services/slices/ingredientsSlice';

export const router = createBrowserRouter([
  { path: '/',
    element: <ConstructorPage />
  },
  {
    path: '/feed',
    element: <Feed />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/reset-password',
    element: <ResetPassword />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/profile/orders',
    element: <ProfileOrders />
  },
  {
    path:'*',
    element: <NotFound404 />
  },
  {
    path: '/profile/orders/:number',
    element: <Modal title = "" onClose ={ () => {}}>
              <OrderInfo />
            </Modal>
  },
  {
    path: '/ingredients/:id',
    element: <Modal title = "" onClose ={ () => {}}>
              <IngredientDetails />
            </Modal>
  },
  {
    path: '/feed/:number',
    element: <Modal title = "" onClose ={ () => {}}>
              <OrderInfo />
            </Modal>
  }
]);



const App = () => {
  return(
  <div className={styles.app}>
    <AppHeader />
     <RouterProvider router={router}>

        </RouterProvider>
  </div>
  )
};

export default App;
