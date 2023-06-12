import { useRoutes, Navigate } from 'react-router-dom';
import Pages from '../pages';

function AppRoutes() {
	const routes = useRoutes([
		{
			path: '/',
			element: <Navigate to='/todos/today' replace />,
		},
		{
			path: '/todos/*',
			element: <Pages.Home />,
		},
		{
			path: '/auth',
			element: <Pages.Auth />,
		},
	]);

	return routes;
}

export default AppRoutes;
