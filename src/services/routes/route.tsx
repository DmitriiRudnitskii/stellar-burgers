import { createBrowserRouter} from 'react-router-dom'
import {
  ConstructorPage,
  Feed,
  Register,
  Login,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '../../pages';
import {ModalRoute, OrderInfo, IngredientDetails } from '../../components';
import App from '../../components/app/app'


export const router = createBrowserRouter([
 { path: '/',
    element: <App />,
  children: [
    { path: '/', element: <ConstructorPage /> },
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
    path: '*',
    element: <NotFound404 />
  },
  {
    path: '/profile/orders/:number',
    element: (
      <ModalRoute>
        <OrderInfo />
      </ModalRoute>
    )
  },
  {
    path: '/ingredients/:id',
    element: (
      <ModalRoute>
        <IngredientDetails />
      </ModalRoute>
    )
  },
  {
    path: '/feed/:number',
    element: (
      <ModalRoute>
        <OrderInfo />
      </ModalRoute>
    )
  }

  ]
  
}]);
