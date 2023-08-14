import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  friends: [],
  CurrentChat: [],
  Userchats: []
}

const ChatSlice = createSlice({
  name: 'UserChats',
  initialState,
  reducers : {
    SetUserChats(state, action) {
      state.Userchats = action.payload;
    },
    SetCurrentChat(state, action) {
      state.CurrentChat = action.payload;
    },
  }
});

export const { SetUserChats, SetCurrentChat} = ChatSlice.actions;

export default ChatSlice.reducer;