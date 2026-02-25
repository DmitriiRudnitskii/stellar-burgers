import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { getConstructorSelector } from '../../services/slices/constructorSlice';
import {
  orderBurger,
  clearConstructor
} from '../../services/slices/constructorSlice';
import { getUserSelector } from '../../services/slices/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const { constructorItems, orderRequest, orderModalData } = useSelector(
    getConstructorSelector
  );
  const { user } = useSelector(getUserSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login', { state: { redirectedFrom: location } });
    } else {
      dispatch(
        orderBurger(
          constructorItems.ingredients
            .map((ingredient) => ingredient._id)
            .concat(constructorItems.bun._id)
        )
      );
    }
  };
  const closeOrderModal = () => {
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
