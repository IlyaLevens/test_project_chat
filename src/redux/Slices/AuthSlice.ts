import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  logged_in: false,
  email: '',
  username: '',
  id: ''
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
    Setusername(state, action) {
      state.username = action.payload;
    },
  }
});

export const { IsLoggedin, SetEmail, Setusername } = AuthSlice.actions;

export default AuthSlice.reducer;