import storageService from './storage.service';
import { generateId } from '../utils';

export const todosKey = import.meta.env.VITE_STORAGE_TODOS_KEY;
const defaultValue = {};

function createTodo(data = {}) {
	return {
		id: generateId(),
		creationDate: new Date().toISOString(),
		description: data.description || '',
		note: data.note || '',
		dueDate: data.dueDate || '',
		belongsToList: data.belongsToList || '',
		important: data.important || false,
		completed: data.completed || false,
		today: data.today || false,
	};
}

function add(uid, data) {
	const allTodos = storageService.getItem(todosKey, defaultValue);
	const newTodo = createTodo(data);

	if (!allTodos[uid]) allTodos[uid] = [];
	allTodos[uid].push(newTodo);
	storageService.setItem(todosKey, allTodos);

	return allTodos[uid];
}

function get(uid) {
	const allTodos = storageService.getItem(todosKey, defaultValue);

	if (!allTodos[uid]) return [];

	const today = new Date().toDateString();
	const updatedTodos = allTodos[uid].map((o) => {
		if (o.today) {
			const crDate = new Date(o.creationDate).toDateString();
			const modDate = new Date(o.lastUpdate).toDateString();
			o.today = crDate === today || (o.today && modDate === today);
			return o;
		}
		return o;
	});

	allTodos[uid] = updatedTodos;

	storageService.setItem(todosKey, allTodos);

	return updatedTodos;
}

function update(uid, data) {
	const { id, ...restData } = data;
	const allTodos = storageService.getItem(todosKey, defaultValue);
	const updatedTodos =
		allTodos[uid]?.map((o) =>
			o.id === id
				? { ...o, ...restData, lastUpdate: new Date().toISOString() }
				: o
		) || [];

	allTodos[uid] = updatedTodos;
	storageService.setItem(todosKey, allTodos);

	return updatedTodos;
}

function remove(uid, id) {
	const allTodos = storageService.getItem(todosKey, defaultValue);
	const updatedTodos = allTodos[uid]?.filter((o) => o.id !== id) || [];

	allTodos[uid] = updatedTodos;
	storageService.setItem(todosKey, allTodos);

	return updatedTodos;
}

export default { add, get, update, remove };
