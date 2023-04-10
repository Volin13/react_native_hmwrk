import { createSlice } from '@reduxjs/toolkit';
import { authSignIn, authSignOut, authSignUp } from './authOperations';

const initialState = {
  userName: '',
  email: '',
  userID: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      return {
        userName: action.payload.userName,
        email: action.payload.email,
        userID: action.payload.userID,
      };
    },
    setUserID: (state, action) => {
      return { ...state, UserID: action.payload };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(authSignUp.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(authSignIn.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(authSignOut.fulfilled, () => {
        return initialState;
      });
  },
});

export const { setUserData, setUserID } = authSlice.actions;
