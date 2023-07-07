import { createContext, useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import todosService from '../services/todos.service';

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
	const [todos, setTodos] = useState([]);
	const [activeTodo, setActiveTodo] = useState({});
	const memoized = useRef({
		loadTodos,
	});

	function selectActiveTodo(id) {
		const todoFound = todos.find((o) => o.id === id);
		setActiveTodo(todoFound || {});
	}

	function deselectActiveTodo() {
		setActiveTodo({});
	}

	function addTodo(data) {
		const { uid, ...restdata } = data;
		const todos = todosService.add(uid, restdata);
		setTodos(todos);
		toast.success('Todo added');
	}

	function updateTodo(data) {
		const { uid, ...restData } = data;
		const todos = todosService.update(uid, restData);
		setTodos(todos);
		toast.success('Todo updated');
	}

	function deleteTodo(uid, id) {
		const todos = todosService.remove(uid, id);
		setTodos(todos);
		toast.success('Todo deleted successfully');
	}

	function toggleCompleteTodo({ uid, id, completed } = {}) {
		const todos = todosService.update(uid, { id, completed });
		setTodos(todos);
	}

	function toggleImportantTodo({ uid, id, important } = {}) {
		const todos = todosService.update(uid, { id, important });
		setTodos(todos);
	}

	function loadTodos(uid) {
		const todos = todosService.get(uid);
		setTodos(todos);
	}

	return (
		<TodosContext.Provider
			value={{
				todos,
				activeTodo,
				selectActiveTodo,
				deselectActiveTodo,
				addTodo,
				toggleCompleteTodo,
				toggleImportantTodo,
				updateTodo,
				deleteTodo,
				...memoized.current,
			}}
		>
			{children}
		</TodosContext.Provider>
	);
}

TodosContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default TodosContextProvider;
