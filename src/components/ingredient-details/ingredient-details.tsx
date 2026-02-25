import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { useParams } from 'react-router-dom';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector, useDispatch } from '../../services/store';
import {
  getIngredientsSelector,
  getIngredients
} from '../../services/slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  let { buns, mains, sauces } = useSelector(getIngredientsSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!buns.length && !mains.length && !sauces.length) {
      dispatch(getIngredients());
    }
  }, []);
  const { id } = useParams();
  const ingredientData = useMemo(
    () =>
      buns
        .concat(mains)
        .concat(sauces)
        .find((ingredient) => ingredient._id === id),
    [buns]
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
