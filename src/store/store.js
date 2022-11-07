import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
// import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { userReducer } from './reducer/userSlice';
import { errorReducer } from './reducer/errorSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    error: errorReducer,
  },
  enhancers: [applyMiddleware(thunk)],
});

export default store;
