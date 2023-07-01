import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import {
	render,
	screen,
	setupUser,
	AllTheProviders,
	waitFor,
} from '../test-utils';
import Auth from '../../pages/Auth.page';

function renderPage() {
	return render(
		<MemoryRouter>
			<AllTheProviders>
				<Auth />
			</AllTheProviders>
		</MemoryRouter>
	);
}

const user = setupUser();
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
const userCredentials = {
	username: 'goku',
	email: 'goku@mail.com',
	password: 'gokuuuu',
	repeatPassword: 'gokuuuu',
};

async function submitSignUpForm({ username, email, password, repeatPassword }) {
	if (username) await user.type(signupForm.usernameInput(), username);
	if (email) await user.type(signupForm.emailInput(), email);
	if (password) await user.type(signupForm.passwordInput(), password);
	if (repeatPassword)
		await user.type(signupForm.repeatPasswordInput(), repeatPassword);
	user.keyboard('{Enter>1}');
}

async function submitSignInForm({ email, password }) {
	if (email) await user.type(signinForm.emailInput(), email);
	if (password) await user.type(signinForm.passwordInput(), password);
	user.keyboard('{Enter>1}');
}

describe('<AuthPage />', () => {
	describe('LAYOUT', () => {
		describe('SIGN IN FORM', () => {
			it('should display the title of the signin form', () => {
				renderPage();

				expect(signinForm.title()).toBeInTheDocument();
			});

			it('should have an email input', () => {
				renderPage();

				expect(signinForm.emailInput()).toBeInTheDocument();
			});

			it('should have an email input of type email', () => {
				renderPage();

				expect(signinForm.emailInput()).toHaveAttribute(
					'type',
					'email'
				);
			});

			it('should have a password input', () => {
				renderPage();

				expect(signinForm.passwordInput()).toBeInTheDocument();
			});

			it('should have a password input of type password', () => {
				renderPage();

				expect(signinForm.passwordInput()).toHaveAttribute(
					'type',
					'password'
				);
			});
		});
		describe('SIGN UP FORM', () => {
			it('should display the title of the signup form', () => {
				renderPage();

				expect(signupForm.title()).toBeInTheDocument();
			});

			it('should have a username input', () => {
				renderPage();

				expect(signupForm.usernameInput()).toBeInTheDocument();
			});

			it('should have a username input of type text', () => {
				renderPage();

				expect(signupForm.usernameInput()).toHaveAttribute(
					'type',
					'text'
				);
			});

			it('should have an email input', () => {
				renderPage();

				expect(signupForm.emailInput()).toBeInTheDocument();
			});

			it('should have an email input of type email', () => {
				renderPage();

				expect(signupForm.emailInput()).toHaveAttribute(
					'type',
					'email'
				);
			});

			it('should have a password input', () => {
				renderPage();

				expect(signupForm.passwordInput()).toBeInTheDocument();
			});

			it('should have a password input of type password', () => {
				renderPage();

				expect(signupForm.passwordInput()).toHaveAttribute(
					'type',
					'password'
				);
			});

			it('should have a repeat password input', () => {
				renderPage();

				expect(signupForm.repeatPasswordInput()).toBeInTheDocument();
			});

			it('should have a repeat password input of type password', () => {
				renderPage();

				expect(signupForm.repeatPasswordInput()).toHaveAttribute(
					'type',
					'password'
				);
			});

			it('should display the sign-in form by default', () => {
				renderPage();

				expect(Array.from(signinForm.element().classList)).toContain(
					'visible'
				);
				expect(
					Array.from(signupForm.element().classList)
				).not.toContain('visible');
			});

			it('should render the signup form overlay by default', () => {
				renderPage();

				expect(Array.from(signupForm.overlay().classList)).toContain(
					'visible'
				);
				expect(
					Array.from(signinForm.overlay().classList)
				).not.toContain('visible');
			});
		});
	});
	describe('INTERACTIONS', () => {
		it('should display the signup form when the signup overlay button is clicked', async () => {
			renderPage();

			await user.click(signupForm.overlayButton());

			expect(Array.from(signupForm.element().classList)).toContain(
				'visible'
			);
			expect(Array.from(signinForm.element().classList)).not.toContain(
				'visible'
			);
		});

		it('should display the signin form again when the signin overlay button is clicked', async () => {
			renderPage();

			await user.click(signupForm.overlayButton());
			await user.click(signinForm.overlayButton());

			expect(Array.from(signinForm.element().classList)).toContain(
				'visible'
			);
			expect(Array.from(signupForm.element().classList)).not.toContain(
				'visible'
			);
		});

		it('should hide the signup overlay when the signup overlay button is clicked', async () => {
			renderPage();

			await user.click(signupForm.overlayButton());

			expect(Array.from(signupForm.overlay().classList)).not.toContain(
				'visible'
			);
		});

		it('should display the signin overlay when the signup overlay button is clicked', async () => {
			renderPage();

			await user.click(signupForm.overlayButton());

			expect(Array.from(signinForm.overlay().classList)).toContain(
				'visible'
			);
		});

		it('should hide the signin overlay when the signin overlay button is clicked', async () => {
			renderPage();

			await user.click(signupForm.overlayButton());
			await user.click(signinForm.overlayButton());

			expect(Array.from(signinForm.overlay().classList)).not.toContain(
				'visible'
			);
		});

		it('should display the signup overlay when the signin overlay button is clicked', async () => {
			renderPage();

			await user.click(signupForm.overlayButton());
			await user.click(signinForm.overlayButton());

			expect(Array.from(signupForm.overlay().classList)).toContain(
				'visible'
			);
		});

		describe('SIGN IN', () => {
			it('should be able to type in the email input', async () => {
				renderPage();

				await user.type(signinForm.emailInput(), 'goku');

				expect(signinForm.emailInput()).toHaveValue('goku');
			});

			it('should be able to type in the password input', async () => {
				renderPage();

				await user.type(signinForm.passwordInput(), 'goku');

				expect(signinForm.passwordInput()).toHaveValue('goku');
			});
		});

		describe('SIGN UP', () => {
			it('should be able to type in the username input', async () => {
				renderPage();

				await user.type(signupForm.usernameInput(), 'goku');

				expect(signupForm.usernameInput()).toHaveValue('goku');
			});

			it('should be able to type in the email input', async () => {
				renderPage();

				await user.type(signupForm.emailInput(), 'goku');

				expect(signupForm.emailInput()).toHaveValue('goku');
			});

			it('should be able to type in the password input', async () => {
				renderPage();

				await user.type(signupForm.passwordInput(), 'goku');

				expect(signupForm.passwordInput()).toHaveValue('goku');
			});

			it('should be able to type in the repeat password input', async () => {
				renderPage();

				await user.type(signupForm.repeatPasswordInput(), 'goku');

				expect(signupForm.repeatPasswordInput()).toHaveValue('goku');
			});
		});
	});
	describe('VALIDACIONES', () => {
		describe('SIGN UP', () => {
			it('should display an error message if the username field is empty', async () => {
				renderPage();

				await user.click(signupForm.overlayButton());
				await submitSignUpForm({
					...userCredentials,
					username: undefined,
				});

				await waitFor(() => {
					expect(
						screen.queryByText(
							/.username. is not allowed to be empty/i
						)
					).toBeInTheDocument();
				});
			});

			it('should display an error message if the username is less than 4 characters long', async () => {
				renderPage();

				await user.click(signupForm.overlayButton());
				await submitSignUpForm({ ...userCredentials, username: 'h' });

				await waitFor(() => {
					expect(
						screen.queryByText(
							/.username. length must be at least 4 characters long/i
						)
					).toBeInTheDocument();
				});
			});

			it('should display an error message if the email field is empty', async () => {
				renderPage();

				await user.click(signupForm.overlayButton());
				await submitSignUpForm({
					...userCredentials,
					email: undefined,
				});

				await waitFor(() => {
					expect(
						screen.queryByText(
							/.email. is not allowed to be empty/i
						)
					).toBeInTheDocument();
				});
			});

			it('should display an error message if the password field is empty', async () => {
				renderPage();

				await user.click(signupForm.overlayButton());
				await submitSignUpForm({
					...userCredentials,
					password: undefined,
				});

				await waitFor(() => {
					expect(
						screen.queryByText(
							/.password. is not allowed to be empty/i
						)
					).toBeInTheDocument();
				});
			});

			it('should display an error message if the password is less than 8 characters long', async () => {
				renderPage();

				await user.click(signupForm.overlayButton());
				await submitSignUpForm({
					...userCredentials,
					password: '1234',
				});

				await waitFor(() => {
					expect(
						screen.queryByText(
							/.password. length must be at least 8 characters long/i
						)
					).toBeInTheDocument();
				});
			});

			it('should display an error message if the password is longer than 20 characters', async () => {
				renderPage();

				await user.click(signupForm.overlayButton());
				await submitSignUpForm({
					...userCredentials,
					password: '1234567891011121314151617181920',
				});

				await waitFor(() => {
					expect(
						screen.queryByText(
							/.password. length must be less than or equal to 20 characters long/i
						)
					).toBeInTheDocument();
				});
			});

			it('should display an error message if the password contains non-alphanumeric characters', async () => {
				renderPage();

				await user.click(signupForm.overlayButton());
				await submitSignUpForm({
					...userCredentials,
					password: 'goku goha n',
				});

				await waitFor(() => {
					expect(
						screen.queryByText(
							/.password. must only contain alpha-numeric characters/i
						)
					).toBeInTheDocument();
				});
			});

			it('should display an error message if the repeat password field is not equal to the password field', async () => {
				renderPage();

				await user.click(signupForm.overlayButton());
				await submitSignUpForm({
					...userCredentials,
					password: 'gokuvegeta',
					repeatPassword: 'goku',
				});

				await waitFor(() => {
					expect(
						screen.queryByText(
							/.repeat.password. is not equal to .password./i
						)
					).toBeInTheDocument();
				});
			});
		});

		describe('SIGN IN', () => {
			it('should display an error message if the email field is empty', async () => {
				renderPage();

				await submitSignInForm({
					...userCredentials,
					email: undefined,
				});

				await waitFor(() => {
					expect(
						screen.queryByText(
							/.email. is not allowed to be empty/i
						)
					).toBeInTheDocument();
				});
			});

			it('should display an error message if the password field is empty', async () => {
				renderPage();

				await submitSignUpForm({
					...userCredentials,
					password: undefined,
				});

				await waitFor(() => {
					expect(
						screen.queryByText(
							/.password. is not allowed to be empty/i
						)
					).toBeInTheDocument();
				});
			});

			it('should display an error message if the password contains non-alphanumeric characters', async () => {
				renderPage();

				await user.click(signupForm.overlayButton());
				await submitSignUpForm({
					...userCredentials,
					password: 'goku goha n',
				});

				await waitFor(() => {
					expect(
						screen.queryByText(
							/.password. must only contain alpha-numeric characters/i
						)
					).toBeInTheDocument();
				});
			});
		});
	});
});
