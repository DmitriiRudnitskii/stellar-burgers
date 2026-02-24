import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getFeedSelector, getFeed } from '../../services/slices/feedSlice';
import {
  getIngredients,
  getIngredientsSelector
} from '../../services/slices/ingredientsSlice';

export const Feed: FC = () => {
  let { buns, mains, sauces } = useSelector(getIngredientsSelector);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!buns.length && !mains.length && !sauces.length) {
      dispatch(getIngredients());
    }
    dispatch(getFeed());
  }, []);

  /** TODO: взять переменную из стора */
  const { orders } = useSelector(getFeedSelector);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeed());
      }}
    />
  );
};
