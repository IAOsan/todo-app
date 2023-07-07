import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppRoutes from './routes/App.routes';
import { ToastContainer } from 'react-toastify';
import { useListsContext } from './context/Lists.context';
import { useAppContext } from './context/App.context';
import { useTodosContext } from './context/Todos.context';
import authService from './services/auth.service';
import 'react-toastify/dist/ReactToastify.css';

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

	return (
		<>
			<AppRoutes />
			<ToastContainer
				position='top-center'
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='colored'
			/>
		</>
	);
}

export default App;
