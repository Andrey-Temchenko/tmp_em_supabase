import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define a type for the slice state
interface CategoryState {
  list: Category[];
  current?: Category;
}

// Define the initial state using that type
const initialState: CategoryState = {
  list: [],
  current: undefined
};

export const categorySlice = createSlice({
  name: 'category',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    loadCategories: (state, action: PayloadAction<Category[]>) => {
      state.list = action.payload;
    },
    createCategory: (state, action: PayloadAction<Category>) => {
      state.list.push(action.payload);
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const index = state.list.findIndex(category => category.id === action.payload.id);

      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteCategory: (state, action: PayloadAction<number>) => {
      const newList = state.list.filter(category => category.id !== action.payload);
      state.list = newList;
    }
  }
});

export const {loadCategories, createCategory, updateCategory, deleteCategory} = categorySlice.actions;

export default categorySlice.reducer;
