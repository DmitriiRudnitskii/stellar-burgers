import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import {
  getOrderSelector,
  getOrderByNumber
} from '../../services/slices/orderSlice';
import {
  getIngredientsSelector,
  getIngredients
} from '../../services/slices/ingredientsSlice';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const { orderData } = useSelector(getOrderSelector);
  const { buns, mains, sauces } = useSelector(getIngredientsSelector);
  const ingredients: TIngredient[] = buns.concat(mains).concat(sauces);
  const { number } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (number && !Number.isNaN(+number)) dispatch(getOrderByNumber(+number));
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
  }, []);
  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    console.log(orderData);
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
