import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Types
export interface Suggestion {
  description: string;
  location?: { lat: number; lng: number } | null;
  place_id?: string;
}

export interface PlaceDetails {
  address?: string;
  placeId?: string;
  lat?: number;
  lng?: number;
  [key: string]: any;
}

export interface GeocodeResult {
  // adapt to whatever your backend returns; keep generic for now
  [key: string]: any;
}

const OLA_MAPS_BASE = 'https://api.olamaps.io';
const LOCAL_GEOCODE = 'http://localhost:3000/api/places/search/json';
const API_KEY = 'qOmAe8G8Tbky3bmGXYNM1SwmNyFoC5Oy9T5KW9a4';

export const olaMapsApi = createApi({
  reducerPath: 'olaMapsApi',
  baseQuery: fetchBaseQuery({ baseUrl: OLA_MAPS_BASE }),
  endpoints: (builder) => ({
    getSuggestions: builder.query<Suggestion[], string>({
      // input is the query string
      async queryFn(arg, _queryApi, _extraOptions, fetchWithBQ) {
        const query = arg?.trim();
        if (!query) return { data: [] };

        const params = new URLSearchParams({ input: query, api_key: API_KEY });
        const url = `/places/v1/autocomplete?${params.toString()}`;

        const res = await fetchWithBQ(url);
        if (res.error) return { error: res.error as any };

        // Map response to our Suggestion[] shape
        const predictions = (res.data as any)?.predictions || [];
        const suggestions: Suggestion[] = predictions.map((p: any) => ({
          description: p.description,
          location: p.geometry?.location || null,
          place_id: p.place_id,
        }));

        return { data: suggestions };
      },
    }),

    getPlaceDetails: builder.query<PlaceDetails, string>({
      async queryFn(placeId, _queryApi, _extraOptions, fetchWithBQ) {
        const id = placeId?.trim();
        if (!id) return { data: {} as PlaceDetails };

        const params = new URLSearchParams({ place_id: id, api_key: API_KEY });
        const url = `/places/v1/details?${params.toString()}`;

        const res = await fetchWithBQ(url);
        if (res.error) return { error: res.error as any };

        const result = (res.data as any)?.result || {};
        const details: PlaceDetails = {
          address: result?.name,
          placeId: id,
          lat: result?.geometry?.location?.lat,
          lng: result?.geometry?.location?.lng,
          // you can add more simplified address components if needed
        };

        return { data: details };
      },
    }),

    getGeocode: builder.query<GeocodeResult[], string>({
      // This endpoint calls your local geocode proxy
      async queryFn(address, _queryApi, _extraOptions, fetchWithBQ) {
        const addr = address?.trim();
        if (!addr) return { data: [] };

        const params = new URLSearchParams({ address: addr });
        // We must call the absolute URL because baseUrl is OLA_MAPS_BASE
        const res = await fetchWithBQ(`${LOCAL_GEOCODE}?${params.toString()}`);
        if (res.error) return { error: res.error as any };

        // adapt to what your backend returns. original service expected response.copResults
        const results = (res.data as any)?.copResults || [];
        return { data: results };
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetSuggestionsQuery,
  useLazyGetSuggestionsQuery,
  useGetPlaceDetailsQuery,
  useLazyGetPlaceDetailsQuery,
  useGetGeocodeQuery,
  useLazyGetGeocodeQuery,
} = olaMapsApi;
