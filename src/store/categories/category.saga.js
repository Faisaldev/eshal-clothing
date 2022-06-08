import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getCategoriesDoc } from '../../services/firebase.service';
import { fetchCategoryFailed, fetchCategorySuccess } from './category.action';
import { CATEGORY_ACTION_TYPES } from './category.types';

function* fetchCategoriesAsync() {
  try {
    const categories = yield call(getCategoriesDoc, 'categories');
    yield put(fetchCategorySuccess(categories));
  } catch (error) {
    yield put(fetchCategoryFailed(error));
  }
}

function* onFetchCategories() {
  yield takeLatest(
    CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
