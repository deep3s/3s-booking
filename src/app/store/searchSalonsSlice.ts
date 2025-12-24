import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SalonLocation, Specialist } from '../../services/searchSalons.api';

interface LocationDetails {
  locationId: number;
  locationName: string;
  images: string[];
  address: string;
}

interface SearchSalonsState {
  salons: SalonLocation[];
  locationDetails: LocationDetails | null;
  specialists: Specialist[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SearchSalonsState = {
  salons: [],
  locationDetails: null,
  specialists: [],
  status: 'idle',
  error: null,
};

const searchSalonsSlice = createSlice({
  name: 'searchSalons',
  initialState,
  reducers: {
    setLocationDetails: (state, action: PayloadAction<LocationDetails>) => {
      state.locationDetails = action.payload;
    },
    clearLocationDetails: (state) => {
      state.locationDetails = null;
    },
    setSpecialists: (state, action: PayloadAction<Specialist[]>) => {
      state.specialists = action.payload;
    },
    clearSpecialists: (state) => {
      state.specialists = [];
    },
  },
  extraReducers: () => {
    // RTK Query will handle state updates
  },
});

export const { setLocationDetails, clearLocationDetails, setSpecialists, clearSpecialists } = searchSalonsSlice.actions;
export default searchSalonsSlice.reducer;

