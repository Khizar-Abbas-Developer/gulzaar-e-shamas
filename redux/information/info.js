import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personal_information: {},
  documents_information: {},
  lineage_information: {},
  residential_information: {},
  agreements_information: {},
};

const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    storeFirstSection: (state, action) => {
      state.personal_information = action.payload;
    },
    storeSecondSection: (state, action) => {
      state.documents_information = action.payload;
    },
    storeThirdSection: (state, action) => {
      state.lineage_information = action.payload;
    },
    storeFourthSection: (state, action) => {
      state.residential_information = action.payload;
    },
    storeFifthSection: (state, action) => {
      state.agreements_information = action.payload;
    },
  },
});

export const {
  storeFirstSection,
  storeSecondSection,
  storeThirdSection,
  storeFourthSection,
  storeFifthSection,
} = infoSlice.actions;
export default infoSlice.reducer;
