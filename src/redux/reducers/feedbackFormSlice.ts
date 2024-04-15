import { createSlice } from '@reduxjs/toolkit';

interface FeedbackFormState {
  isOpen: boolean;
}

const initialState: FeedbackFormState = {
  isOpen: false,
};

export const feedbackFormSlice = createSlice({
  name: 'feedbackForm',
  initialState,
  reducers: {
    openFeedbackForm: (state: FeedbackFormState) => {
      state.isOpen = true;
    },
    closeFeedbackForm: (state: FeedbackFormState) => {
      state.isOpen = false;
    },
  },
});

export const { openFeedbackForm, closeFeedbackForm } = feedbackFormSlice.actions;
export default feedbackFormSlice.reducer;
