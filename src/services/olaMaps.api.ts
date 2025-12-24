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
          description: p.structured_formatting.main_text,
          long_desc: p.description,
          location: p.geometry?.location || null,
          place_id: p.place_id,
        }));

        return { data: suggestions };
      },
    }),

    getPlaceDetails: builder.query<PlaceDetails, string>({
      async queryFn(placeId = "", _queryApi, _extraOptions, fetchWithBQ) {
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

    // Reverse geocode: accepts a lat,lng string (e.g. "12.34,56.78") or same format
    reverseGeocode: builder.query<PlaceDetails, string>({
      async queryFn(latlng = "", _queryApi, _extraOptions, fetchWithBQ) {
        const arg = latlng?.trim();
        if (!arg) return { data: {} as PlaceDetails };

        const params = new URLSearchParams({ latlng: arg, api_key: API_KEY });
        const url = `/places/v1/reverse-geocode?${params.toString()}`;

        const res = await fetchWithBQ(url);
        if (res.error) return { error: res.error as any };

        // API shape may vary; try to read results[] first (per provided example)
        const payload = res.data as any;
        // Prefer payload.results[0] if present (matches the example you provided)
        const result = Array.isArray(payload?.results) && payload.results.length ? payload.results[0] : (payload?.result || (Array.isArray(payload) && payload[0]) || {});

        // Extract lat/lng from geometry.location when available, otherwise parse the latlng param
        let lat: number | undefined;
        let lng: number | undefined;
        if (result?.geometry?.location) {
          lat = Number(result.geometry.location.lat ?? result.geometry.location.latitude ?? undefined);
          lng = Number(result.geometry.location.lng ?? result.geometry.location.longitude ?? undefined);
        }
        if ((lat == null || lng == null) && arg) {
          const parts = arg.split(',').map((s: string) => parseFloat(s.trim()));
          if (parts.length === 2 && !Number.isNaN(parts[0]) && !Number.isNaN(parts[1])) {
            lat = parts[0];
            lng = parts[1];
          }
        }

        const details: PlaceDetails = {
          address: result?.formatted_address || result?.name || result?.address || undefined,
          placeId: result?.place_id || result?.place_id || undefined,
          lat,
          lng,
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
  useReverseGeocodeQuery,
  useLazyReverseGeocodeQuery,
  useGetGeocodeQuery,
  useLazyGetGeocodeQuery,
} = olaMapsApi;
