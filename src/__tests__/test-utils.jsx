import { afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import AppContextProvider from '../context/App.context';
import ListsContextProvider from '../context/Lists.context';
import TodosContextProvider from '../context/Todos.context';
import userEvent from '@testing-library/user-event';

// cleanup
afterEach(cleanup);

/* eslint-disable react/prop-types */
export const AllTheProviders = ({ isAuth, children }) => {
	const user = {
		username: 'goku',
		email: 'goku@mail.com',
		password: 'gokuuu',
	};

	return (
		<AppContextProvider config={isAuth ? { user } : undefined}>
			<ListsContextProvider>
				<TodosContextProvider>{children}</TodosContextProvider>
			</ListsContextProvider>
		</AppContextProvider>
	);
};

export const customRender = (ui, options) =>
	render(ui, { wrapper: ({ children }) => children, ...options });

export function setupUser() {
	return userEvent.setup();
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
