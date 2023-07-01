import {
	afterAll,
	afterEach,
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
} from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import MockDate from 'mockdate';
import bcrypt from 'bcryptjs';
import {
	render,
	AllTheProviders,
	screen,
	setupUser,
	waitFor,
	waitForElementToBeRemoved,
} from './test-utils';
import App from '../App';
import storageService from '../services/storage.service';
import { salt, userKey, usersKey } from '../services/auth.service';
import { todosKey } from '../services/todos.service';

function renderApp({ entries } = { entries: ['/'] }) {
	return render(
		<MemoryRouter initialEntries={entries}>
			<AllTheProviders>
				<App />
			</AllTheProviders>
		</MemoryRouter>
	);
}

const user = setupUser();
const authPage = () => screen.queryByTestId('auth-page');
const homePage = () => screen.queryByTestId('home-page');
const newTodoForm = {
	element: () => screen.queryByTestId('newtodo-form'),
	descriptionInput: () => screen.queryByTestId('newtodo-input'),
};
const editTodoForm = {
	element: () => screen.queryByTestId('editing-form'),
	closeBtn: () => screen.queryByTestId('editing-form-close-button'),
	descriptionInput: () => screen.queryByPlaceholderText('Description'),
	addToTodayOpt: () => screen.queryByTestId('editing-form-option-my-day'),
	saveBtn: () => screen.queryByTestId('editing-form-save-button'),
	deleteBtn: () => screen.queryByTestId('editing-form-delete-button'),
};
const navigation = {
	todayLink: () => screen.queryByRole('link', { name: /today/i }),
	allLink: () => screen.queryByRole('link', { name: /all/i }),
	toggler: () => screen.queryByTestId('sidebar-toggler'),
};
const signinForm = {
	element: () => screen.queryByTestId('signin-form'),
	title: () => screen.queryByTestId('sigin-form-title'),
	emailInput: () => screen.queryByTestId('signin-form-email-input'),
	passwordInput: () => screen.queryByTestId('signin-form-password-input'),
	submitButton: () => screen.queryByTestId('signin-form-submit'),
	overlay: () => screen.queryByTestId('signin-form-overlay'),
	overlayButton: () => screen.queryByTestId('signin-form-overlay-button'),
};
const signupForm = {
	element: () => screen.queryByTestId('signup-form'),
	title: () => screen.queryByTestId('signup-form-title'),
	usernameInput: () => screen.queryByTestId('signup-form-username-input'),
	emailInput: () => screen.queryByTestId('signup-form-email-input'),
	passwordInput: () => screen.queryByTestId('signup-form-password-input'),
	repeatPasswordInput: () =>
		screen.queryByTestId('signup-form-repeatpassword-input'),
	submitButton: () => screen.queryByTestId('signup-form-submit'),
	overlay: () => screen.queryByTestId('signup-form-overlay'),
	overlayButton: () => screen.queryByTestId('signup-form-overlay-button'),
};
const profile = {
	element: () => screen.queryByTestId('profile'),
	signout: () => screen.queryByTestId('profile-signout'),
};
const userCredentials = {
	username: 'goku',
	email: 'goku@mail.com',
	password: 'gokuuuuu',
	repeatPassword: 'gokuuuuu',
	uid: 'abcdefghi',
};

function setUser() {
	storageService.setItem(userKey, {
		username: userCredentials.username,
		email: userCredentials.email,
		uid: userCredentials.uid,
	});
}

function setUsers() {
	storageService.setItem(usersKey, [
		{
			uid: userCredentials.uid,
			username: userCredentials.username,
			email: userCredentials.email,
			password: bcrypt.hashSync(userCredentials.password, salt),
		},
	]);
}

function setTodos() {
	storageService.setItem(todosKey, {
		[userCredentials.uid]: [
			{
				id: '1143e1f8e05',
				creationDate: '2023-06-29T22:16:10.682Z',
				description: 'new todo added',
				note: '',
				dueDate: '',
				belongsToList: '',
				important: false,
				completed: false,
				today: true,
			},
			{
				id: '1ebfcd2706',
				creationDate: '2023-06-29T22:16:11.118Z',
				description: 'new todo added',
				note: '',
				dueDate: '',
				belongsToList: '',
				important: false,
				completed: false,
				today: true,
			},
			{
				id: 'c0ac1a6690',
				creationDate: '2023-06-29T22:16:11.558Z',
				description: 'new todo added',
				note: '',
				dueDate: '',
				belongsToList: '',
				important: false,
				completed: false,
				today: true,
			},
		],
	});
}

function clearUser() {
	storageService.removeItem(userKey);
}

function clearUsers() {
	storageService.removeItem(usersKey);
}

function clearTodos() {
	storageService.removeItem(todosKey);
}

async function addATodo(description) {
	await user.type(
		newTodoForm.descriptionInput(),
		description || 'new todo added'
	);
	await user.keyboard('{Enter>1}');
}

async function signUp() {
	await user.click(signupForm.overlayButton());
	await user.type(signupForm.usernameInput(), userCredentials.username);
	await user.type(signupForm.emailInput(), userCredentials.email);
	await user.type(signupForm.passwordInput(), userCredentials.password);
	await user.type(
		signupForm.repeatPasswordInput(),
		userCredentials.repeatPassword
	);
	await user.keyboard('{Enter>1}');
}

async function signIn({ email, password } = {}) {
	await user.type(signinForm.emailInput(), email || userCredentials.email);
	await user.type(
		signinForm.passwordInput(),
		password || userCredentials.password
	);
	await user.keyboard('{Enter>1}');
}

describe('<App />', () => {
	describe('ROUTING', () => {
		afterEach(() => {
			clearUser();
		});

		it('should redirect to the /auth route if not authenticated', () => {
			renderApp();
			expect(authPage()).toBeInTheDocument();
		});

		it('should redirect to the / route if authenticated when trying to access the /auth route', () => {
			setUser();
			renderApp({ entries: ['/auth'] });
			expect(homePage()).toBeInTheDocument();
		});

		it('should redirect to the /todos/today route when accessing the / route if authenticated', () => {
			setUser();
			renderApp();
			expect(
				screen.queryByRole('heading', { name: /today/i })
			).toBeInTheDocument();
		});

		it('should display the correct page for the /todos/today route', () => {
			setUser();
			renderApp();
			expect(homePage()).toBeInTheDocument();
			expect(authPage()).not.toBeInTheDocument();
		});

		it('should display the correct page for the /todos/all route', () => {
			setUser();
			renderApp({ entries: ['/todos/all'] });
			expect(homePage()).toBeInTheDocument();
			expect(authPage()).not.toBeInTheDocument();
		});

		it('should load the correct page for the /auth route', () => {
			renderApp();
			expect(authPage()).toBeInTheDocument();
			expect(homePage()).not.toBeInTheDocument();
		});

		it('should redirect to the /todos/today route if the route does not exist', () => {
			setUser();
			renderApp({ entries: ['/anywhere'] });
			expect(
				screen.queryByRole('heading', { name: /today/i })
			).toBeInTheDocument();
		});
	});
	describe('INTERACTIONS', () => {
		beforeAll(() => {
			MockDate.set('1/30/2023');
			setUser();
		});
		afterAll(() => {
			MockDate.reset();
			clearUser();
		});

		describe('NAVIGATION', () => {
			beforeEach(setUser);

			it('should redirect to the /todos/all route when clicking on the link', async () => {
				renderApp();

				await user.click(navigation.allLink());

				expect(
					screen.queryByRole('heading', { name: /all/i })
				).toBeInTheDocument();
			});

			it('should redirect to the /todos/today route if on another route', async () => {
				renderApp({ entries: ['/todos/all'] });

				await user.click(navigation.todayLink());

				expect(
					screen.queryByRole('heading', { name: /today/i })
				).toBeInTheDocument();
			});
		});

		describe('ADD TODOS', () => {
			beforeAll(setUser);
			beforeEach(clearTodos);
			afterAll(storageService.clear);

			it('should be able to add new todos through the add todo form', async () => {
				renderApp();

				await addATodo();

				expect(
					screen.queryByText(/new todo added/i)
				).toBeInTheDocument();
			});

			it('should clear the add todo form after adding the todo', async () => {
				renderApp();

				await addATodo();

				expect(newTodoForm.descriptionInput()).toHaveValue('');
			});

			it('should lose focus on the description input after adding the todo', async () => {
				renderApp();

				await addATodo();

				expect(newTodoForm.descriptionInput()).not.toHaveFocus();
			});

			it('should update the todos count in the sidebar when adding a todo', async () => {
				renderApp();

				expect(
					screen.queryByTestId('todos-count-today')
				).toHaveTextContent('0');
				expect(
					screen.queryByTestId('todos-count-all')
				).toHaveTextContent('0');

				await addATodo();

				expect(
					screen.queryByTestId('todos-count-today')
				).toHaveTextContent('1');
				expect(
					screen.queryByTestId('todos-count-all')
				).toHaveTextContent('1');
			});
		});

		describe('MARK AS COMPLETED', () => {
			beforeAll(setUser);
			beforeEach(clearTodos);
			afterAll(storageService.clear);

			it('debería marcar como completada la tarea si aún no lo está al hacer clic en el checkbox de la tarea', async () => {
				renderApp();

				await addATodo();
				const itemCheck = screen.queryByTestId(
					'todoitem-check-element'
				);
				await user.click(itemCheck);

				expect(itemCheck).toBeChecked();
			});

			it('debería tachar la descripción de la tarea al marcarla como completada', async () => {
				renderApp();

				await addATodo('todo 1');

				expect(screen.queryByText('todo 1').tagName).toBe('P');

				const itemCheck = screen.queryByTestId(
					'todoitem-check-element'
				);
				await user.click(itemCheck);

				expect(screen.queryByText('todo 1').tagName).toBe('S');
			});

			it('debería desmarcar como completada la tarea si ya lo está al hacer clic en el checkbox de la tarea', async () => {
				renderApp();

				await addATodo();
				const itemCheck = screen.queryByTestId(
					'todoitem-check-element'
				);
				await user.click(itemCheck);
				await user.click(itemCheck);

				expect(itemCheck).not.toBeChecked();
			});
		});

		describe('EDIT TODOS', () => {
			beforeAll(setUser);
			beforeEach(clearTodos);
			afterAll(storageService.clear);

			it('should be hidden by default the edit form', async () => {
				renderApp();

				expect(
					Array.from(editTodoForm.element().classList)
				).not.toContain('visible');
			});

			it('should mark the task as active when clicking on a task', async () => {
				renderApp();

				await addATodo();
				const todo = screen.queryByText(/new todo added/i);
				await user.click(todo);

				expect(Array.from(todo.closest('li').classList)).toContain(
					'active'
				);
			});

			it('should open the edit form when clicking on a task', async () => {
				renderApp();

				await addATodo();
				await user.click(screen.queryByText(/new todo added/i));

				expect(Array.from(editTodoForm.element().classList)).toContain(
					'visible'
				);
			});

			it('should display the close button when the edit form appears', async () => {
				renderApp();

				await addATodo();
				await user.click(screen.queryByText(/new todo added/i));

				expect(editTodoForm.closeBtn()).toBeInTheDocument();
			});

			it('should display the description of the selected task when the edit form appears', async () => {
				renderApp();

				await addATodo();
				await user.click(screen.queryByText(/new todo added/i));

				expect(editTodoForm.descriptionInput()).toHaveValue(
					'new todo added'
				);
			});

			it('should display if the task is added to today when the edit form appears', async () => {
				renderApp();

				await addATodo();
				await user.click(screen.queryByText(/new todo added/i));

				// by default, addToToday should be true
				expect(editTodoForm.addToTodayOpt()).toBeChecked();
			});

			it('should display the creation date of the task when the edit form is opened', async () => {
				const expectedDate = new Date().toLocaleString('en-US', {
					weekday: 'short',
					month: 'short',
					day: '2-digit',
					year: 'numeric',
				});
				renderApp();

				await addATodo();
				await user.click(screen.queryByText(/new todo added/i));

				expect(
					screen.queryByText(`Created at ${expectedDate}`)
				).toBeInTheDocument();
			});

			it('should display the save button when the edit form is opened', async () => {
				renderApp();

				await addATodo();
				await user.click(screen.queryByText(/new todo added/i));

				expect(editTodoForm.saveBtn()).toBeInTheDocument();
			});

			it('should display the delete button when the edit form is opened', async () => {
				renderApp();

				await addATodo();
				await user.click(screen.queryByText(/new todo added/i));

				expect(editTodoForm.deleteBtn()).toBeInTheDocument();
			});

			it('should be able to change the description of the task when typing in the description input', async () => {
				renderApp();

				await addATodo();
				await user.click(screen.queryByText(/new todo added/i));
				await user.type(editTodoForm.descriptionInput(), ', modified');

				expect(editTodoForm.descriptionInput()).toHaveValue(
					'new todo added, modified'
				);
			});

			it('should be able to change the "add to my day" option', async () => {
				renderApp();

				await addATodo();
				await user.click(screen.queryByText(/new todo added/i));

				// by default, addToToday should be true
				expect(editTodoForm.addToTodayOpt()).toBeChecked();
				await user.click(editTodoForm.addToTodayOpt());

				expect(editTodoForm.addToTodayOpt()).not.toBeChecked();
			});

			it('should apply the changes to the task when clicking on the save button', async () => {
				renderApp();

				await addATodo('new todo');
				await user.click(screen.queryByText(/new todo/i));
				await user.type(editTodoForm.descriptionInput(), ' updated');
				await user.click(editTodoForm.saveBtn());

				expect(
					screen.queryByText(/new todo updated/i)
				).toBeInTheDocument();
			});

			it('should close the edit form after saving the changes', async () => {
				renderApp();

				await addATodo('new todo');
				await user.click(screen.queryByText(/new todo/i));
				await user.click(editTodoForm.saveBtn());

				expect(
					Array.from(editTodoForm.element().classList)
				).not.toContain('visible');
			});

			it('should delete the task when clicking on the delete button', async () => {
				renderApp();

				await addATodo('new todo');
				await user.click(screen.queryByText(/new todo/i));
				await user.click(editTodoForm.deleteBtn());

				expect(screen.queryByText('new todo')).not.toBeInTheDocument();
			});

			it('should close the edit form when deleting the task', async () => {
				renderApp();

				await addATodo('new todo');
				await user.click(screen.queryByText(/new todo/i));
				await user.click(editTodoForm.deleteBtn());

				expect(
					Array.from(editTodoForm.element().classList)
				).not.toContain('visible');
			});

			it('should close the edit form when clicking on the close button', async () => {
				renderApp();

				await addATodo();
				await user.click(screen.queryByText(/new todo added/i));
				await user.click(editTodoForm.closeBtn());

				expect(
					Array.from(editTodoForm.element().classList)
				).not.toContain('visible');
			});

			it('should discard the unsaved changes when opening and closing the edit form for the same task', async () => {
				renderApp();

				await addATodo();
				await user.click(screen.queryByText(/new todo added/i));
				await user.type(editTodoForm.descriptionInput(), ' hello');
				await user.click(editTodoForm.closeBtn());
				await user.click(screen.queryByText(/new todo added/i));

				expect(editTodoForm.descriptionInput()).toHaveValue(
					'new todo added'
				);
			});

			it('should update the today todos count when removing from today', async () => {
				renderApp();

				await addATodo('todo 1');
				await addATodo('todo 2');
				await user.click(screen.queryByText('todo 1'));
				await user.click(editTodoForm.addToTodayOpt());
				await user.keyboard('{Enter>1}');

				expect(
					screen.queryByTestId('todos-count-today')
				).toHaveTextContent(1);
			});

			it('should not update the todos count when removing from today', async () => {
				renderApp();

				await addATodo('todo 1');
				await addATodo('todo 2');
				await user.click(screen.queryByText('todo 1'));
				await user.click(editTodoForm.addToTodayOpt());
				await user.keyboard('{Enter>1}');

				expect(
					screen.queryByTestId('todos-count-all')
				).toHaveTextContent(2);
			});

			it('should update the today todos count after deleting a todo', async () => {
				renderApp();

				await addATodo('first todo');
				await addATodo('second todo');
				await addATodo('third todo');
				await user.click(screen.queryByText('second todo'));
				await user.click(editTodoForm.deleteBtn());

				expect(
					screen.queryByTestId('todos-count-today')
				).toHaveTextContent(2);
			});

			it('should update the todos count after deleting a todo', async () => {
				renderApp();

				await addATodo('first todo');
				await addATodo('second todo');
				await addATodo('third todo');
				await user.click(screen.queryByText('second todo'));
				await user.click(editTodoForm.deleteBtn());

				expect(
					screen.queryByTestId('todos-count-all')
				).toHaveTextContent(2);
			});

			it('should display an error message if the empty edit form is submitted', async () => {
				renderApp();

				await addATodo('new todo');
				await user.click(screen.queryByText(/new todo/i));
				await user.clear(editTodoForm.descriptionInput());
				await user.click(editTodoForm.saveBtn());

				expect(
					screen.queryByText(
						'"Description" is not allowed to be empty'
					)
				).toBeInTheDocument();
			});
		});
	});
	describe('SIGN UP', () => {
		afterEach(() => {
			clearUser();
			clearUsers();
		});

		it('should create an account with the email and redirect to the home route', async () => {
			renderApp();

			await signUp();

			expect(homePage()).toBeInTheDocument();
		});

		it('should display the username and email after creating an account', async () => {
			renderApp();

			await signUp();

			expect(
				screen.queryByText(userCredentials.username)
			).toBeInTheDocument();
			expect(
				screen.queryByText(userCredentials.email)
			).toBeInTheDocument();
		});

		it('should automatically log in if the page is reloaded after creating an account', async () => {
			const { rerender } = renderApp();

			await signUp();

			rerender(
				<MemoryRouter>
					<AllTheProviders>
						<App />
					</AllTheProviders>
				</MemoryRouter>
			);

			expect(homePage()).toBeInTheDocument();
		});

		it('should display an error message if trying to create an existing account', async () => {
			setUsers();
			renderApp();

			await signUp();

			await waitFor(() => {
				expect(
					screen.queryByText(/Account already exists/i)
				).toBeInTheDocument();
			});
		});
	});
	describe('SIGN IN', () => {
		beforeEach(clearUser);
		beforeAll(setUsers);
		afterAll(clearUsers);

		it('should redirect to the home route after signing in with the email', async () => {
			renderApp();

			await signIn();

			expect(homePage()).toBeInTheDocument();
		});

		it('should automatically log in when authenticated and the page is reloaded', async () => {
			const { rerender } = renderApp();

			await signIn();

			rerender(
				<MemoryRouter>
					<AllTheProviders>
						<App />
					</AllTheProviders>
				</MemoryRouter>
			);

			expect(homePage()).toBeInTheDocument();
		});

		it('should display an error message if trying to log in with a non-existent account', async () => {
			renderApp();

			await signIn({ email: 'vegeta@mail.com', password: '123456789' });

			await waitFor(() => {
				expect(
					screen.queryByText(/this account does not exist/i)
				).toBeInTheDocument();
			});
		});

		it('should display an error message if an incorrect password is entered', async () => {
			renderApp();

			await signIn({ password: '123456789' });

			await waitFor(() => {
				expect(
					screen.queryByText(/invalid password/i)
				).toBeInTheDocument();
			});
		});
	});
	describe('SIGN OUT', () => {
		beforeAll(setUser);
		afterAll(clearUser);

		it('should not display the sign out option by default', async () => {
			renderApp();

			expect(Array.from(profile.element().classList)).not.toContain(
				'expanded'
			);
		});

		it('should display the sign out option when clicking on the account', async () => {
			renderApp();

			await user.click(profile.element());

			expect(Array.from(profile.element().classList)).toContain(
				'expanded'
			);
		});

		it('should hide the sign out option if it is visible when clicking on the account', async () => {
			renderApp();

			await user.click(profile.element());
			await user.click(profile.element());

			expect(Array.from(profile.element().classList)).not.toContain(
				'expanded'
			);
		});

		it('should redirect to the /auth route after signing out', async () => {
			renderApp();

			await user.click(profile.element());
			await user.click(profile.signout());

			expect(authPage()).toBeInTheDocument();
		});
	});
	describe('RENDERIZADO DE ELEMENTOS', () => {
		beforeEach(() => {
			setUser();
		});
		afterEach(() => {
			clearUser();
		});

		describe('ROUTE /TODAY', () => {
			beforeEach(clearTodos);

			it('should display a default message if there are no items in the list for the route', () => {
				renderApp();

				expect(screen.queryByText(/no todos yet/i)).toBeInTheDocument();
				expect(
					screen.queryByText(
						/it looks like it's empty, new tasks you add will appear here/i
					)
				).toBeInTheDocument();
			});

			it('should default to adding new tasks to the /today route', async () => {
				renderApp();

				await addATodo();

				await user.click(navigation.todayLink());

				expect(screen.queryAllByTestId('todositem')).toHaveLength(1);
			});

			it('should display in the todo metadata if it is added to today', async () => {
				renderApp();

				await addATodo();

				expect(
					screen.queryByTestId('todositem-metadata')
				).toHaveTextContent(/today/i);
			});

			it('should not display the added task in the route if the task is edited and not added to today', async () => {
				renderApp();

				await addATodo();
				await user.click(screen.queryByText(/new todo added/i));
				await user.click(editTodoForm.addToTodayOpt());
				await user.keyboard('{Enter>1}');

				await user.click(navigation.todayLink());
				expect(screen.queryAllByTestId('todositem')).toHaveLength(0);
			});

			it('should not display in the todo metadata if it is added to today and then removed from today', async () => {
				renderApp();

				await addATodo();
				await user.click(screen.queryByText(/new todo added/i));
				await user.click(editTodoForm.addToTodayOpt());
				await user.keyboard('{Enter>1}');

				await user.click(navigation.allLink());
				expect(
					screen.queryByTestId('todositem-metadata')
				).toHaveTextContent('');
			});

			it("should display today's tasks when reloading the page", async () => {
				const { rerender } = renderApp();

				await addATodo();
				await addATodo();
				await addATodo();

				rerender(
					<MemoryRouter>
						<AllTheProviders>
							<App />
						</AllTheProviders>
					</MemoryRouter>
				);

				expect(screen.queryAllByTestId('todositem')).toHaveLength(3);
			});

			it('should not display tasks added to previous dates than the current date', async () => {
				setTodos();
				MockDate.set('2023/07/20');
				renderApp();

				await user.click(navigation.todayLink());
				expect(screen.queryAllByTestId('todositem')).toHaveLength(0);
				MockDate.reset();
			});
		});

		describe('ROUTE /ALL', () => {
			beforeEach(clearTodos);

			it('should display a default message if there are no items in the list for the route', async () => {
				renderApp();

				await user.click(navigation.todayLink());

				expect(screen.queryByText(/no todos yet/i)).toBeInTheDocument();
				expect(
					screen.queryByText(
						/it looks like it's empty, new tasks you add will appear here/i
					)
				).toBeInTheDocument();
			});

			it('should display all added tasks', async () => {
				renderApp();

				await addATodo();
				await addATodo();
				await addATodo();
				await addATodo();

				await user.click(navigation.todayLink());

				expect(screen.queryAllByTestId('todositem')).toHaveLength(4);
			});

			it('should display all added tasks when reloading the page', async () => {
				const { rerender } = renderApp();

				await addATodo();
				await addATodo();
				await addATodo();
				await addATodo();

				rerender(
					<MemoryRouter>
						<AllTheProviders>
							<App />
						</AllTheProviders>
					</MemoryRouter>
				);

				await user.click(navigation.todayLink());

				expect(screen.queryAllByTestId('todositem')).toHaveLength(4);
			});

			it('should display completed tasks when reloading the page', async () => {
				const { rerender } = renderApp();

				await addATodo();
				await addATodo();
				await addATodo();
				await addATodo();

				let checks = screen.queryAllByTestId('todoitem-check');
				await user.click(checks[0]);
				await user.click(checks[1]);

				rerender(
					<MemoryRouter>
						<AllTheProviders>
							<App />
						</AllTheProviders>
					</MemoryRouter>
				);

				await user.click(navigation.todayLink());
				checks = screen.queryAllByTestId('todoitem-check');

				expect(checks[0].firstElementChild).toBeChecked();
				expect(checks[1].firstElementChild).toBeChecked();
				expect(checks[2].firstElementChild).not.toBeChecked();
				expect(checks[3].firstElementChild).not.toBeChecked();
			});

			it('should display edited tasks when reloading the page', async () => {
				const { rerender } = renderApp();

				await addATodo('todo 1');
				await addATodo('todo 2');
				await addATodo('todo 3');
				await addATodo('todo 4');
				await user.click(screen.queryByText('todo 1'));
				await user.type(editTodoForm.descriptionInput(), ' edited');
				await user.click(editTodoForm.saveBtn());

				rerender(
					<MemoryRouter>
						<AllTheProviders>
							<App />
						</AllTheProviders>
					</MemoryRouter>
				);

				await user.click(navigation.todayLink());

				expect(screen.queryByText('todo 1 edited')).toBeInTheDocument();
			});
		});
	});
});
