import PropTypes from 'prop-types';
import Form, { FormControl, FormGroup } from './common/Form.component';
import Icon from './common/Icon.component';
import { AddIcon } from '../icons';
import { getClassName } from '../utils';

function NewTodoForm({ variant }) {
	const variants = {
		primary: 'bgcolor-primary-500 color-light-500',
		secondary: 'bgcolor-secondary-600 color-light-500',
		warning: 'bgcolor-warning-500',
		info: 'bgcolor-info-500 color-light-500',
	};

	return (
		<Form
			className={getClassName('form--new-todo', {
				[variants[variant]]: variant,
			})}
		>
			<FormGroup className='flex flex-ai-c m-0 p-0'>
				<Icon size='lg' className='mr-16'>
					<AddIcon />
				</Icon>
				<FormControl
					type='text'
					name='description'
					placeholder='Add a task'
					required
				/>
			</FormGroup>
		</Form>
	);
}

NewTodoForm.propTypes = {
	variant: PropTypes.oneOf(['primary', 'secondary', 'warning', 'info']),
};

export default NewTodoForm;
