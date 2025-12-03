import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedPlace {
  address?: string;
  placeId?: string;
  lat?: number;
  lng?: number;
  [key: string]: any;
}

interface UserLocation {
  latitude: number;
  longitude: number;
  timestamp?: string;
  source?: string;
}

interface OlaMapsState {
  selectedPlace: SelectedPlace | null;
  suggestions: Array<any>;
  userLocation?: UserLocation | null;
  reverseGeocodeResult?: any | null;
}

const initialState: OlaMapsState = {
  selectedPlace: null,
  suggestions: [],
  userLocation: null,
  reverseGeocodeResult: null,
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
    setUserLocation(state, action: PayloadAction<UserLocation | null>) {
      state.userLocation = action.payload;
    },
    clearUserLocation(state) {
      state.userLocation = null;
    },
    setReverseGeocodeResult(state, action: PayloadAction<any | null>) {
      state.reverseGeocodeResult = action.payload;
    },
    clearReverseGeocodeResult(state) {
      state.reverseGeocodeResult = null;
    },
  },
});

export const { setSelectedPlace, clearSelectedPlace, setSuggestions, clearSuggestions, setUserLocation, clearUserLocation, setReverseGeocodeResult, clearReverseGeocodeResult } = olaMapsSlice.actions;
export default olaMapsSlice.reducer;
