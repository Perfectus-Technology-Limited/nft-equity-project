import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import viewFullPropertySlice from "./viewFullPropertySlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    fullPropertyModal: viewFullPropertySlice
  }
});
