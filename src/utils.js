export function isString(value) {
	return Object.prototype.toString.call(value) === '[object String]';
}

export function isNumber(value) {
	return !isNaN(value);
}

export function isObject(value) {
	return Object.prototype.toString.call(value) === '[object Object]';
}

export function isEmptyObject(obj) {
	if (!isObject) return new Error('The input must be of type object');
	return Object.getOwnPropertyNames(obj).length === 0;
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

export function setTestid(id) {
	if (import.meta.env.DEV) {
		return {
			'data-testid': id,
		};
	}
	return {};
}

class StringParser {
	constructor(value) {
		this.value = this.parse(value);
	}

	parse(value) {
		if (!value) return '';
		return String(value);
	}

	trim() {
		return this.value.trim();
	}
}

export const string = (value) => new StringParser(value);

export class Validator {
	constructor(value) {
		this.value = value;
		this._label = '';
		this.error = null;
	}
	label(name) {
		if (!isString(name)) throw new Error('Label expected to be a string');
		this._label = name;
		return this;
	}
	string() {
		if (!isString(this.value) && !this.error) {
			this.error = `"${this._label}" must be a string`;
		}
		return this;
	}
	trim() {
		if (!isString(this.value))
			throw new Error('The value to trim is not of type string');
		this.value = this.value.trim();
		return this;
	}
	required(message) {
		if (!this.value !== 0 && !this.value && !this.error) {
			this.error =
				message || `"${this._label}" is not allowed to be empty`;
		}
		return this;
	}
	email() {
		const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!isValid.test(this.value) && !this.error) {
			this.error = `"${this._label}" is not a valid email`;
		}
		return this;
	}
	min(value) {
		if (isString(this.value) && this.value.length < value && !this.error) {
			this.error = `"${this._label}" length must be at least ${value} characters long`;
		}
		return this;
	}
	max(value) {
		if (isString(this.value) && this.value.length > value && !this.error) {
			this.error = `"${this._label}" length must be less than or equal to ${value} characters long`;
		}
		return this;
	}
	equal(object) {
		if (!isObject(object) && Object.keys(object).length > 1) {
			return new Error(
				'An object is expected as input with a single value'
			);
		}

		for (const key in object) {
			if (this.value !== object[key] && !this.error) {
				this.error = `"${this._label}" is not equal to "${key}"`;
			}
		}
		return this;
	}
	alphanum() {
		const isAlphanum = /^[A-Za-z0-9]+$/i;
		if (!isAlphanum.test(this.value) && !this.error) {
			this.error = `"${this._label}" must only contain alpha-numeric characters`;
		}
		return this;
	}
}

export function generateId() {
	return Math.ceil(Math.random() * Date.now()).toString(16);
}
