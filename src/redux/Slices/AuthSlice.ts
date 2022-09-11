import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  logged_in: false,
  email: '',
  password: ''
}

const AuthSlice = createSlice({
  name: 'Autherisation',
  initialState,
  reducers : {
    IsLoggedin(state, action) {
      state.logged_in = action.payload;
    },
    SetEmail(state, action) {
      state.email = action.payload;
    },
    SetPassword(state, action) {
      state.password = action.payload;
    },
  }
});

export const { IsLoggedin, SetEmail, SetPassword } = AuthSlice.actions;

export default AuthSlice.reducer;