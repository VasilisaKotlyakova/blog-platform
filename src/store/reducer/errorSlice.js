import { createSlice } from '@reduxjs/toolkit';

const errorSlice = createSlice({
  name: 'error',
  initialState: null,
  reducers: {
    showError: (_, { payload: { error } }) => error,
  },
});

export const { reducer: errorReducer } = errorSlice;
export const { showError } = errorSlice.actions;
export const errorSelector = (state) => state.error;
