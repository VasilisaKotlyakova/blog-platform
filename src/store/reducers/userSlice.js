/* eslint-disable */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiConnect } from '../../services/service';
import { getItem, setItem, removeItem } from '../../services/storage';

const sliceName = 'user';
const authTokenKey = 'authToken';

export const signUp = createAsyncThunk(`${sliceName}/signUp`, (data) => apiConnect.signUp(data));
export const signIn = createAsyncThunk(`${sliceName}/signIn`, async (data, api) => {
  const result = await apiConnect.signIn(data);
  api.dispatch(fetchProfile());
  return result;
});
export const fetchProfile = createAsyncThunk(`${sliceName}/fetchProfile`, () => apiConnect.fetchProfile());
export const editProfile = createAsyncThunk(`${sliceName}/editProfile`, (data) => apiConnect.editProfile(data));

const userSlice = createSlice({
  name: sliceName,
  initialState: {
    profile: null,
    authToken: getItem(authTokenKey),
  },
  reducers: {
    signOut: () => {
      removeItem(authTokenKey);
      return { authToken: null, profile: null };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (_, { payload: { user } }) => {
        setItem(authTokenKey, user.token);
        return { authToken: user.token, profile: user };
      })
      .addCase(signIn.fulfilled, (_, { payload: { user } }) => {
        setItem(authTokenKey, user.token);
        return { authToken: user.token, profile: null };
      })
      .addCase(fetchProfile.fulfilled, (_, { payload: { user } }) => {
        if (!user) {
          removeItem(authTokenKey);
          return { authToken: null, profile: null };
        }
        setItem(authTokenKey, user.token);
        return { authToken: user.token, profile: user };
      })
      .addCase(editProfile.fulfilled, (_, { payload: { user } }) => {
        setItem(authTokenKey, user.token);
        return { authToken: user.token, profile: user };
      });
  },
});

if (userSlice.getInitialState()) {
  const { authToken } = userSlice.getInitialState();
  apiConnect.setHeader(authToken);
}

export const { reducer: userReducer } = userSlice;
export const { signOut } = userSlice.actions;
export const profileSelector = (state) => state[sliceName].profile;
export const authTokenSelector = (state) => state[sliceName].authToken;

export default userSlice;
