import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './providers/ThemeProvider';
import { Layout } from '../components/Layout';
import { AppRoutes } from './routes';
import {useEffect} from "react";

export default function App() {
    useEffect(() => {
        // Request location access on app launch with fallback
        const savedLocation = localStorage.getItem('userLocation');

        if (!savedLocation) {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const locationData = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            timestamp: new Date().toISOString(),
                            source: 'geolocation'
                        };
                        localStorage.setItem('userLocation', JSON.stringify(locationData));
                        localStorage.setItem('locationPermission', 'granted');
                    },
                    (error) => {
                        /*console.warn('Geolocation unavailable, using default location:', error.message);
                        // Use default location (e.g., New York City) as fallback
                        const defaultLocationData = {
                            latitude: 40.7128,
                            longitude: -74.0060,
                            timestamp: new Date().toISOString(),
                            source: 'default',
                            city: 'New York, NY'
                        };
                        localStorage.setItem('userLocation', JSON.stringify(defaultLocationData));*/
                        localStorage.setItem('locationPermission', 'denied');
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    }
                );
            }
        }
    }, []);


    return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}
