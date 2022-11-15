import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ConfirmAction {
  title: string;
  text?: string;
  action: () => void;
}

interface AsyncActions {
  [key: string]: boolean;
}

// Define a type for the slice state
interface CommonState {
  asyncActions: AsyncActions;
  confirmAction?: ConfirmAction;
}

// Define the initial state using that type
const initialState: CommonState = {
  asyncActions: {},
  confirmAction: undefined
};

export const commonSlice = createSlice({
  name: 'common',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    asyncActionStart: (state, action: PayloadAction<string>) => {
      state.asyncActions[action.payload] = true;
    },
    asyncActionEnd: (state, action: PayloadAction<string>) => {
      delete state.asyncActions[action.payload];
    },
    confirmAction: (state, action: PayloadAction<ConfirmAction>) => {
      state.confirmAction = action.payload;
    },
    confirmActionCancel: state => {
      state.confirmAction = undefined;
    }
  }
});

export const {asyncActionStart, asyncActionEnd, confirmAction, confirmActionCancel} = commonSlice.actions;

export default commonSlice.reducer;
