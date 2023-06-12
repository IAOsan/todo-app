import { createContext, useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import data from '../data';

export const TodosContext = createContext();
export const useTodosContext = () => {
	const context = useContext(TodosContext);

	if (!context)
		throw new Error(
			'"useTodosContext" must be called in "TodosContextProvider"'
		);

	return context;
};

function TodosContextProvider({ children }) {
	const [todos, setTodos] = useState(data);
	const [activeTodo, setActiveTodo] = useState({});
	const memoized = useRef({
		selectTodo,
	});

	function selectTodo(id) {
		setActiveTodo(todos.find((o) => o.id === id));
	}

	return (
		<TodosContext.Provider
			value={{
				todos,
				activeTodo,
				...memoized.current,
			}}
		>
			{children}
		</TodosContext.Provider>
	);
}

TodosContextProvider.propTypes = {
	children: PropTypes.any.isRequired,
};

export default TodosContextProvider;
