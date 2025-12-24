import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface SalonLocation {
  locationId: number;
  businessId: number;
  locationName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  contactPhone: string;
  locationEmail: string;
  openingHours: string;
  otherLocationDetails: string;
  locationType: string;
  latitude: number;
  longitude: number;
  imageNames: string[];
  primaryImageUrl: string | null;
}

export interface SearchSalonsResponse {
  success: boolean;
  message: string;
  data: SalonLocation[];
  error: any;
}

export interface Specialist {
  lastName: string;
  firstName: string;
  specialistId?: number;
  specialistName?: string;
  title?: string;
  notes?: string;
  experienceYears?: number;
  rating?: number;
  reviewCount?: number;
  specialties?: string[];
  profileImageUrl?: string;
  isActive?: boolean;
}

export interface SpecialistsResponse {
  success: boolean;
  message: string;
  data: Specialist[];
  error: any;
}

export interface LocationDetailsResponse {
  success: boolean;
  message: string;
  data: {
    locationId: number;
    businessId: number;
    locationName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    contactPhone: string;
    locationEmail: string;
    openingHours: string;
    otherLocationDetails: string;
    locationType: string;
    latitude: number;
    longitude: number;
    imageNames: string[];
    primaryImageUrl: string | null;
    images?: string[];
    serviceCategories?: Array<{
      categoryId: number;
      categoryName: string;
      services: Array<{
        serviceId: number;
        businessId: number;
        categoryId: number;
        serviceName: string;
        description: string;
        durationMinutes: number;
        basePrice: number;
        isActive: boolean;
        commissionPercentage: number;
        createdAt: string;
        updatedAt: string;
      }>;
    }>;
  };
  error: any;
}

export const searchSalonsApi = createApi({
  reducerPath: 'searchSalonsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/' }),
  endpoints: (builder) => ({
    searchNearbySalons: builder.query<SearchSalonsResponse, { lng: number; lat: number; radiusKm: number }>({
      query: ({ lng, lat, radiusKm }) => `locations/nearby?lng=${lng}&lat=${lat}&radiusKm=${radiusKm}`,
    }),
    getLocationDetails: builder.query<LocationDetailsResponse, number>({
      query: (locationId) => `locations/details/${locationId}`,
    }),
    getLocationSpecialists: builder.query<SpecialistsResponse, number>({
      query: (locationId) => `staff/location/${locationId}`,
    }),
  }),
});

export const { useSearchNearbySalonsQuery, useLazySearchNearbySalonsQuery, useGetLocationDetailsQuery, useGetLocationSpecialistsQuery } = searchSalonsApi;

