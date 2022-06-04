import { getCategoriesDoc } from '../../services/firebase.service';
import { createAction } from '../../utils/reducer.utils';
import { CATEGORY_ACTION_TYPES } from './category.types';

export const fetchCategoryStart = () =>
  createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategorySuccess = categories =>
  createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);

export const fetchCategoryFailed = error =>
  createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesAsync = () => async dispatch => {
  dispatch(fetchCategoryStart());

  try {
    const categories = await getCategoriesDoc('categories');
    dispatch(fetchCategorySuccess(categories));
  } catch (error) {
    dispatch(fetchCategoryFailed(error));
  }
};
