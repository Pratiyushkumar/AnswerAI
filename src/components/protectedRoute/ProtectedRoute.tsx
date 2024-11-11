import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useAppDispatch } from '@/app/hooks';
import { checkUserLoggedIn } from '@/app/features/auth/authSlice';
import { useEffect } from 'react';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user, loading } = useSelector((state: RootState) => state.auth);
    const location = useLocation();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(checkUserLoggedIn());
    }, [dispatch]);

    if (!user && !loading) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;