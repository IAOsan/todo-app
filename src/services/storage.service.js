import ls from 'localstorage-slim';

function setItem(key, data) {
	ls.set(key, data, { encrypt: true });
}

function removeItem(key) {
	ls.remove(key);
}

function clear() {
	ls.clear();
}

function getItem(key, defaultValue = null) {
	const data = ls.get(key, { decrypt: true });

	if (!data) {
		setItem(key, defaultValue);
		return defaultValue;
	}
	return data;
}

export default {
	setItem,
	getItem,
	removeItem,
	clear,
};
