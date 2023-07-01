import { useEffect, useState } from 'react';
import Spinner from '../components/common/Spinner.component';
import Sidebar from '../components/Sidebar.component';
import Todos from '../components/Todos.component';
import EditTodoForm from '../components/EditTodoForm.component';
import { useListsContext } from '../context/Lists.context';
import { useTodosContext } from '../context/Todos.context';
import { setTestid } from '../utils';
import { SunIcon, StarIcon, InfiniteIcon } from '../icons';

function Home() {
	const { lists } = useListsContext();
	const { todos } = useTodosContext();
	const [filteredTodos, setFilteredTodos] = useState(null);
	const icons = {
		sun: <SunIcon />,
		star: <StarIcon />,
		infinite: <InfiniteIcon />,
	};

	useEffect(() => {
		const mappedTodos = lists.reduce((acc, v) => {
			if (!acc[v.label]) acc[v.label] = [];
			acc[v.label] =
				v.label === 'all' ? todos : todos.filter((o) => o[v.label]);
			return acc;
		}, {});
		setFilteredTodos(mappedTodos);
	}, [lists, todos]);

	if (!filteredTodos) {
		return <Spinner />;
	}

	return (
		<main {...setTestid('home-page')}>
			<Sidebar icons={icons} todosList={filteredTodos} />
			<Todos icons={icons} todosList={filteredTodos} />
			<EditTodoForm />
		</main>
	);
}

export default Home;
