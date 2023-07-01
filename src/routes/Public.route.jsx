import { Outlet, Navigate } from 'react-router-dom';
import { useAppContext } from '../context/App.context';

function PublicRoute() {
	const { isAuth } = useAppContext();

	if (isAuth) return <Navigate to='/' replace />;
	return <Outlet />;
}

export default PublicRoute;
