import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeedSelector, getOrders } from '../../services/slices/feedSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const {orders} = useSelector(getFeedSelector);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOrders())
  }, [])


  return <ProfileOrdersUI orders={orders} />;
};
