import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form, { FormControl, FormGroup } from './common/Form.component';
import Icon from './common/Icon.component';
import { useAppContext } from '../context/App.context';
import { useTodosContext } from '../context/Todos.context';
import { AddIcon } from '../icons';
import {
	getClassName,
	setTestid,
	isEmptyObject,
	Validator,
	string,
} from '../utils';

function NewTodoForm({ variant }) {
	const params = useParams();
	const { user } = useAppContext();
	const { addTodo } = useTodosContext();
	const [formValues, setFormValues] = useState({
		description: '',
	});
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [errors, setErrors] = useState({});
	const variants = {
		primary: 'bgcolor-primary-500 color-light-500',
		secondary: 'bgcolor-secondary-600 color-light-500',
		warning: 'bgcolor-warning-500',
		info: 'bgcolor-info-500 color-light-500',
	};

	useEffect(() => {
		if (isEmptyObject(errors) && isSubmitted) {
			addTodo({
				...formValues,
				today: true,
				uid: user.uid,
			});
			setIsSubmitted(false);
			clearForm();
		}
	}, [errors, isSubmitted, addTodo, formValues, params, user]);

	function clearForm() {
		setFormValues((prevState) => {
			return Object.keys(prevState).reduce((acc, v) => {
				acc[v] = '';
				return acc;
			}, {});
		});
	}

	function loseFocus(formEl) {
		Array.from(formEl.elements).forEach((e) => {
			e.value = '';
			e.blur();
		});
	}

	function validate(formData) {
		const err = {
			description: new Validator(formData.description)
				.label('Description')
				.string()
				.trim()
				.required().error,
		};

		return {
			...(err.description && { description: err.description }),
		};
	}

	function handleChange(e) {
		setFormValues((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	}

	function handleSubmit(e) {
		e.preventDefault();
		const errors = validate(formValues);
		setErrors(errors);
		setFormValues((prevState) => ({
			description: string(prevState.description).trim(),
		}));
		setIsSubmitted(true);
		loseFocus(e.target);
	}

	return (
		<Form
			{...setTestid('newtodo-form')}
			onSubmit={handleSubmit}
			className={getClassName('form--new-todo', {
				[variants[variant]]: variant,
			})}
		>
			<FormGroup className='flex flex-ai-c m-0 p-0'>
				<Icon size='lg' className='mr-16'>
					<AddIcon />
				</Icon>
				<FormControl
					{...setTestid('newtodo-input')}
					onChange={handleChange}
					type='text'
					name='description'
					placeholder='Add a task'
					value={formValues.description}
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
