import {Routes, Route, Navigate} from 'react-router-dom';
import {HomePage} from '../features/HomePage';
import {SalonsPage} from '../features/SalonsPage';
import {SalonDetailsPage} from '../features/SalonDetailsPage';
import {ServicesPage} from '../features/ServicesPage';
import {SpecialistsPage} from '../features/SpecialistsPage';
import {PaymentPage} from '../features/PaymentPage';
import {AuthPage} from '../features/auth/AuthPage';
import ProtectedRoute from '../components/ProtectedRoute';
import {DateTimePage} from "../features/DateTimePage";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/auth" element={<AuthPage/>}/>
            <Route>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/salons" element={<SalonsPage/>}/>
                <Route path="/salon/:id" element={<SalonDetailsPage/>}/>
                <Route path="/services" element={<ServicesPage/>}/>
                <Route path="/specialists" element={<SpecialistsPage/>}/>
                <Route path="/datetime" element={<DateTimePage/>}/>
                <Route path="/payment" element={<PaymentPage/>}/>
                <Route path="/preview_page.html" element={<Navigate to="/" replace/>}/>
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Route>
        </Routes>
    );
}
