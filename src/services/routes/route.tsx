import { createBrowserRouter } from 'react-router-dom';
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
import { ModalRoute, OrderInfo, IngredientDetails } from '../../components';
import App from '../../components/app/app';
import { ProtectedRoute } from './protectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <ConstructorPage />,
        children: [
          {
            path: '/ingredients/:id',
            element: (
              <ModalRoute>
                <IngredientDetails />
              </ModalRoute>
            )
          }
        ]
      },
      {
        path: '/feed',
        element: <Feed />,
        children: [
          {
            path: '/feed/:number',
            element: (
              <ModalRoute>
                <OrderInfo />
              </ModalRoute>
            )
          }
        ]
      },
      {
        path: '/login',
        element: (
          <ProtectedRoute onlyUnAuth>
            <Login />
          </ProtectedRoute>
        )
      },
      {
        path: '/register',
        element: (
          <ProtectedRoute onlyUnAuth>
            <Register />
          </ProtectedRoute>
        )
      },
      {
        path: '/forgot-password',
        element: (
          <ProtectedRoute onlyUnAuth>
            <ForgotPassword />
          </ProtectedRoute>
        )
      },
      {
        path: '/reset-password',
        element: (
          <ProtectedRoute onlyUnAuth>
            <ResetPassword />
          </ProtectedRoute>
        )
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      },
      {
        path: '/profile/orders',
        element: (
          <ProtectedRoute>
            <ProfileOrders />
          </ProtectedRoute>
        ),
        children: [
          {
            path: '/profile/orders/:number',
            element: (
              <ProtectedRoute>
                <ModalRoute>
                  <OrderInfo />
                </ModalRoute>
              </ProtectedRoute>
            )
          }
        ]
      },
      {
        path: '*',
        element: <NotFound404 />
      },
      {}
    ]
  }
]);
