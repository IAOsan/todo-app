export function isString(value) {
	return Object.prototype.toString.call(value) === '[object String]';
}

export function isNumber(value) {
	return !isNaN(value);
}

export function isObject(value) {
	return Object.prototype.toString.call(value) === '[object Object]';
}

export function getClassName(...str) {
	return str
		.reduce((acc, s) => {
			if (!s) return acc;

			const isAnString = isString(s);
			const isANumber = isNumber(s);
			const isAnObject = isObject(s) && !!Object.keys(s).length;

			if (isAnString || isANumber) {
				acc.push(s);
			}

			if (isAnObject) {
				const [key, value] = Object.entries(s)[0];
				acc = acc.concat(value ? key : []);
			}

			return acc;
		}, [])
		.join(' ');
}
export function capitalize(str) {
	if (!isString(str)) throw new Error('The input must be of type string');
	return str === '' ? str : `${str[0].toUpperCase()}${str.slice(1)}`;
}

function filterKeyEnter(handler) {
	const keyCodes = {
		8: 'backspace',
		13: 'enter',
	};
	return (e) => {
		if (keyCodes[e.keyCode]) {
			handler(e);
		}
	};
}

export function accessibleOnClick(handler) {
	return {
		role: 'button',
		tabIndex: 0,
		onKeyDown: filterKeyEnter(handler),
		onClick: handler,
	};
}
