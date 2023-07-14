import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  menuOpened: false,
}

export const mobileMenuSlice = createSlice({
  name: 'mobileMenu',
  initialState,
  reducers: {
    openMenu: (state) => {
      state.menuOpened = true;
    },
    closeMenu: (state) => {
      state.menuOpened = false;
    }
  }
})

export const { openMenu, closeMenu } = mobileMenuSlice.actions;

export default mobileMenuSlice.reducer;
