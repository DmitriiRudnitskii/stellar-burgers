import React from 'react';
import { useSelector, useDispatch } from '../store';
import { getUserSelector, checkUserAuth } from '../slices/userSlice';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const { isAuthChecked, user } = useSelector(getUserSelector);
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isAuthChecked) {
      dispatch(checkUserAuth());
    }
  }, [isAuthChecked]);
  if (!isAuthChecked) {
    return <Preloader />;
  }
  if (user && onlyUnAuth) {
    if (location.state?.redirectedFrom) {
      return <Navigate to={location.state.redirectedFrom.pathname} />;
    } else {
      return <Navigate to='/' />;
    }
    return <Navigate replace to='/' />;
  }

  if (!user && !onlyUnAuth) {
    return <Navigate to='/login' state={{ redirectedFrom: location }} />;
  }
  return children;
};
