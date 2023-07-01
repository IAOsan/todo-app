import bcrypt from 'bcryptjs';
import storageService from './storage.service';
import { generateId } from '../utils';

export const usersKey = import.meta.env.VITE_STORAGE_USERS_KEY;
export const userKey = import.meta.env.VITE_STORAGE_USER_KEY;
const SALT_ROUNDS = 11;
export const salt = bcrypt.genSaltSync(SALT_ROUNDS);

function registerWithEmail(credentials) {
	const { username, email, password } = credentials;
	const user = { uid: generateId(), username, email };
	const users = storageService.getItem(usersKey, []);

	if (users.find((u) => u.email === email)) {
		const error = new Error('Account already exists');
		error.code = 400;
		throw error;
	}

	users.push({
		...user,
		password: bcrypt.hashSync(password, salt),
	});
	storageService.setItem(usersKey, users);
	storageService.setItem(userKey, user);

	return user;
}

function loginWithEmail(credentials) {
	const { email, password } = credentials;
	const users = storageService.getItem(usersKey, []);
	const user = users.find((o) => o.email === email);

	if (!user) {
		const error = new Error('This account does not exist');
		error.code = 404;
		throw error;
	}

	if (!bcrypt.compareSync(password, user.password)) {
		const error = new Error('Invalid password');
		error.code = 400;
		throw error;
	}

	delete user.password;
	storageService.setItem(userKey, user);

	return user;
}

function logOut() {
	storageService.setItem(userKey, null);
}

function getUser() {
	return storageService.getItem(userKey);
}

export default { registerWithEmail, loginWithEmail, logOut, getUser };
