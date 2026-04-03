import useAuth from '../hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom';
import { FullPageLoading } from '../components/Loading';

export const AuthOnly = () => {
    const { authenticated, loadings } = useAuth();

    if (loadings) return <FullPageLoading />;
    if (!authenticated) return <Navigate to="/login" />;

    return <Outlet/>
}

export const NewUserOnly = () => {
    const { authenticated, loadings, user } = useAuth();

    if (loadings) return <FullPageLoading />
    if (authenticated && (user?.has_completed_profile || user?.has_completed_quiz)) {
        return <Navigate to="/dashboard" />
    }

    return <Outlet />
}