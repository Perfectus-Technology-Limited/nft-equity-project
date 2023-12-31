import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import viewFullPropertySlice from "./viewFullPropertySlice";
import mobileMenuSlice from "./mobileMenuSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    fullPropertyModal: viewFullPropertySlice,
    mobileMenu: mobileMenuSlice
  }
});
