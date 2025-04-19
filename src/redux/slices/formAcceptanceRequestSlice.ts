import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AcceptanceRequestSpecialForm {
  images: string[];
  categoryAcceptance: any;
  files: DocumentFile[] | [];
}

export interface DocumentFile {
  id: string;
  name: string;
  uri: string;
  mimeType?: string;
  size?: number;
}

interface AcceptanceRequestSpecialFormState {
  data: AcceptanceRequestSpecialForm;
}

const initialState: AcceptanceRequestSpecialFormState = {
  data: {
    images: [],
    categoryAcceptance: null,
    files: [],
  },
};

const acceptanceRequestSpecialFormSlice = createSlice({
  name: "acceptanceRequestSpecialForm",
  initialState,
  reducers: {
    // Updates the `images` field in the form
    changeImages(state, action: PayloadAction<string[]>) {
      state.data.images = action.payload;
    },

    // Updates the `categoryAcceptance` field in the form
    changeCategoryAcceptance(state, action: PayloadAction<any>) {
      state.data.categoryAcceptance = action.payload;
    },

    // Updates the `file` field in the form
    changeDocuments(state, action: PayloadAction<DocumentFile[] | []>) {
      state.data.files = action.payload;
    },

    // Resets the form to its initial state
    resetAcceptanceRequestSpecialForm(state) {
      state.data = {
        images: [],
        categoryAcceptance: null,
        files: [],
      };
    },

    // Initializes the form with a default structure
    initializeForm(state, action: PayloadAction<AcceptanceRequestSpecialForm>) {
      state.data = action.payload;
    },
  },
});

export const {
  changeImages,
  changeCategoryAcceptance,
  changeDocuments,
  resetAcceptanceRequestSpecialForm,
  initializeForm,
} = acceptanceRequestSpecialFormSlice.actions;

export const acceptanceRequestSpecialFormReducer =
  acceptanceRequestSpecialFormSlice.reducer;
