import { createAction } from '../../utils/reducer.utils';
import { CATEGORY_ACTION_TYPES } from './category.types';

export const fetchCategoryStart = () =>
  createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategorySuccess = categories =>
  createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);

export const fetchCategoryFailed = error =>
  createAction(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);
