import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpened: false
}

export const viewFullPropertySlice = createSlice({
  name: 'fullPropertyModal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpened = true
    },
    closeModal: (state) => {
      state.isModalOpened = false
    }
  }
})

export const { openModal, closeModal } = viewFullPropertySlice.actions;

export default viewFullPropertySlice.reducer;