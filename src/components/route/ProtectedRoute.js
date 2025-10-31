import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
export default function ProtectedRoute({ children, isAdmin }) {
    const { isAuthenticated, loading, user } = useSelector(state => state.authState)

    if (loading) {
        return (
              <Loader/>
            );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    if (isAdmin && (!user || user.role !== 'admin')) {
        return <Navigate to="/" replace />
    }

    return children;

}