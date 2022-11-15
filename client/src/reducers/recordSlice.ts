import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import SORT_OPTIONS from 'constants/sortOptions';

// Define a type for the slice state
interface RecordState {
  list: RecordItem[];
  sortBy: string;
}

// Define the initial state using that type
const initialState: RecordState = {
  list: [],
  sortBy: SORT_OPTIONS.DATE
};

export const recordSlice = createSlice({
  name: 'record',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    loadRecords: (state, action: PayloadAction<{records: RecordItem[]; sortBy: string}>) => {
      state.list = action.payload.records;
      state.sortBy = action.payload.sortBy;
    },
    deleteRecord: (state, action: PayloadAction<number>) => {
      const newList = state.list.filter(record => record.id !== action.payload);
      state.list = newList;
    }
  }
});

export const {loadRecords, deleteRecord} = recordSlice.actions;

export default recordSlice.reducer;
