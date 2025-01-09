import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute = ({ element }: PrivateRouteProps) => {
  const { user } = useContext(AuthContext);
  return user.token ? element : <Navigate to="/login" />;
};

export default PrivateRoute;