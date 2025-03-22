import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust the path as needed

const ProtectedLayout = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    alert('You need to log in first to access this page.');
    return <Navigate to="/login" />;
  }

  // Redirect to login if the user is not authenticated
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedLayout;
