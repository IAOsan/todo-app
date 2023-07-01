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
				{
					path: '*',
					element: <Navigate to='/todos/today' />,
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
	]);

	return routes;
}

export default AppRoutes;
