import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define a type for the slice state
interface UserState {
  current?: User;
}

// Define the initial state using that type
const initialState: UserState = {
  current: undefined
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    loadCurrentUser: (state, action: PayloadAction<User | undefined>) => {
      state.current = action.payload;
    }
  }
});

export const {loadCurrentUser} = userSlice.actions;

export default userSlice.reducer;
