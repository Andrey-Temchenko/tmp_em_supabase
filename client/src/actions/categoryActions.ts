import {
  loadCategories as getCategories,
  updateCategory,
  createCategory,
  deleteCategory as removeCategory
} from 'reducers/categorySlice';

import dataService from 'services/dataService';
import helper from './actionHelper';

export default {
  loadCategories,
  saveCategory,
  deleteCategory
};

function loadCategories() {
  return helper.dispatchAsyncAction(async dispatch => {
    const categories = await dataService.getCategories();
    dispatch(getCategories(categories));
  }, false);
}

function saveCategory(category) {
  return helper.dispatchAsyncAction(async dispatch => {
    const categoryResponse: Category = await dataService.saveCategory(category);

    if (category.id) {
      dispatch(updateCategory(categoryResponse));
    } else {
      dispatch(createCategory(categoryResponse));
    }

    return categoryResponse;
  });
}

function deleteCategory(id: number) {
  return helper.dispatchAsyncAction(async dispatch => {
    await dataService.deleteCategory(id);
    dispatch(removeCategory(id));
    return true;
  });
}
