import { render, screen, setupUser, AllTheProviders } from '../test-utils';
import NewTodoForm from '../../components/NewTodoForm.component';
import { describe, expect, it } from 'vitest';

function renderForm() {
	return render(<NewTodoForm variant='primary' />, {
		wrapper: AllTheProviders,
	});
}

const user = setupUser();
const formInput = () => screen.queryByTestId('newtodo-input');

describe('<NewTodoForm />', () => {
	describe('LAYOUT', () => {
		it('should display an input', () => {
			renderForm();
			expect(formInput()).toBeInTheDocument();
		});

		it('should have a text type input', () => {
			renderForm();
			expect(formInput()).toHaveAttribute('type', 'text');
		});

		it('should have a placeholder for the input', () => {
			renderForm();
			expect(formInput()).toHaveAttribute('placeholder', 'Add a task');
		});
	});

	describe('INTERACTIONS', () => {
		it('should be able to type in the input', async () => {
			const expectedStr = 'goku';
			renderForm();
			await user.type(formInput(), expectedStr);
			expect(formInput()).toHaveValue(expectedStr);
		});
	});
});
