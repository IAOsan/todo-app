import { useRoutes, Navigate } from 'react-router-dom';
import Pages from '../pages';
import PrivateRoute from './Private.route';
import PublicRoute from './Public.route';

function AppRoutes() {
	const routes = useRoutes([
		{
			element: <PrivateRoute />,
			children: [
				{
					path: '/todos/:tag',
					element: <Pages.Home />,
				},
			],
		},
		{
			element: <PublicRoute />,
			children: [
				{
					path: '/auth',
					element: <Pages.Auth />,
				},
			],
		},
		{
			path: '/*',
			element: <Navigate to='/todos/today' />,
		},
	]);

	return routes;
}

export default AppRoutes;
