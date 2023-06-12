import { useEffect } from 'react';
import AppRoutes from './routes/App.routes';
import { useListsContext } from './context/Lists.context';
import { useAppContext } from './context/App.context';

function App() {
	const { initialList } = useAppContext();
	const { selectList } = useListsContext();

	useEffect(() => {
		selectList(initialList);
	}, [selectList, initialList]);
	//TODO implementar lista no encontrada
	//TODO implementar pagina no encontrtada

	return <AppRoutes />;
}

export default App;
