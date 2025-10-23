import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './providers/ThemeProvider';
import { Layout } from '../components/Layout';
import { AppRoutes } from './routes';

export default function App() {
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
