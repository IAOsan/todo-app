import { Outlet, Navigate } from 'react-router-dom';
import { useAppContext } from '../context/App.context';

function PrivateRoute() {
	const { isAuth } = useAppContext();

	if (!isAuth) return <Navigate to='/auth' replace />;
	return <Outlet />;
}

export default PrivateRoute;
