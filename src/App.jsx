import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppRoutes from './routes/App.routes';
import { useListsContext } from './context/Lists.context';
import { useAppContext } from './context/App.context';
import { useTodosContext } from './context/Todos.context';
import authService from './services/auth.service';

function App() {
	const { initialList, loginUser, user } = useAppContext();
	const { loadTodos } = useTodosContext();
	const { selectList } = useListsContext();
	const location = useLocation();

	useEffect(() => {
		const user = authService.getUser();
		loginUser(user);
	}, [loginUser]);

	useEffect(() => {
		if (user) loadTodos(user.uid);
	}, [user, loadTodos]);

	useEffect(() => {
		const paramList = location.pathname.split('/').pop();
		selectList(paramList || initialList);
	}, [initialList, location, selectList]);

	return <AppRoutes />;
}

export default App;
