// redux/courseAccessSlice.js
import { createSlice } from "@reduxjs/toolkit";

const courseAccessSlice = createSlice({
  name: "courseAccess",
  initialState: {
    accessMap: {}, 
  },
  reducers: {
    setAccessForCourse: (state, action) => {
      const { key, accessData } = action.payload;
      state.accessMap[key] = accessData;
    },
    clearAllAccess: (state) => {
      state.accessMap = {};
    },
  },
});

export const { setAccessForCourse, clearAllAccess } = courseAccessSlice.actions;
export default courseAccessSlice.reducer;
