import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedPlace {
  address?: string;
  placeId?: string;
  lat?: number;
  lng?: number;
  [key: string]: any;
}

interface OlaMapsState {
  selectedPlace: SelectedPlace | null;
  suggestions: Array<any>;
}

const initialState: OlaMapsState = {
  selectedPlace: null,
  suggestions: [],
};

const olaMapsSlice = createSlice({
  name: 'olaMaps',
  initialState,
  reducers: {
    setSelectedPlace(state, action: PayloadAction<SelectedPlace | null>) {
      state.selectedPlace = action.payload;
    },
    clearSelectedPlace(state) {
      state.selectedPlace = null;
    },
    setSuggestions(state, action: PayloadAction<Array<any>>) {
      state.suggestions = action.payload;
    },
    clearSuggestions(state) {
      state.suggestions = [];
    },
  },
});

export const { setSelectedPlace, clearSelectedPlace, setSuggestions, clearSuggestions } = olaMapsSlice.actions;
export default olaMapsSlice.reducer;

