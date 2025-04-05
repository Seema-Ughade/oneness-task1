import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: []
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const id = Date.now();
      state.notifications.push({
        id,
        title: action.payload.title,
        message: action.payload.message,
        type: action.payload.type || 'success',
        duration: action.payload.duration || 3000
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    }
  }
});

export const { addNotification, removeNotification } = notificationSlice.actions;

export default notificationSlice.reducer;