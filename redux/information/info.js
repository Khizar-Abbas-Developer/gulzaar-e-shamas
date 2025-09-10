import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uploading: false,
  personal_information: {},
  documents_information: {},
  lineage_information: {},
  residential_information: {},
  agreements_information: {},
  trackingId: "",
};

const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    setUploading: (state, action) => {
      state.uploading = action.payload;
    },
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
    resetStates: (state) => {
      const currentTrackingId = state.trackingId; // keep the existing trackingId
      return {
        ...initialState,
        trackingId: currentTrackingId, // restore it after reset
      };
    },

    setTrackingId: (state, action) => {
      state.trackingId = action.payload;
    },
  },
});

export const {
  storeFirstSection,
  storeSecondSection,
  storeThirdSection,
  storeFourthSection,
  storeFifthSection,
  setUploading,
  setTrackingId,
  resetStates,
} = infoSlice.actions;
export default infoSlice.reducer;
