import { useEffect, useState } from 'react';
import Form, {
	FormGroup,
	FormControl,
	FormOption,
	FormFooter,
	FormFeedback,
	FormContent,
} from './common/Form.component';
import Button from './common/Button.component';
import Icon from './common/Icon.component';
import { useAppContext } from '../context/App.context';
import { useTodosContext } from '../context/Todos.context';
import {
	getClassName,
	setTestid,
	isEmptyObject,
	Validator,
	string,
} from '../utils';
import { EditIcon, SunIcon, TrashIcon, SaveIcon } from '../icons';

function EditTodoForm() {
	const { isEditModeActive, toggleEditMode, user } = useAppContext();
	const { activeTodo, updateTodo, deleteTodo, deselectActiveTodo } =
		useTodosContext();
	const [formValues, setFormValues] = useState({});
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [errors, setErrors] = useState({});
	const formClassname = getClassName('form--edit-todo bgcolor-light-500', {
		visible: isEditModeActive,
	});

	useEffect(() => {
		if (isEmptyObject(activeTodo)) return;
		setFormValues({ ...activeTodo, uid: user.uid });
	}, [activeTodo, user]);

	useEffect(() => {
		if (isEmptyObject(errors) && isSubmitted) {
			updateTodo(formValues);
			toggleEditMode();
			setIsSubmitted(false);
		}
	}, [
		errors,
		isSubmitted,
		toggleEditMode,
		updateTodo,
		activeTodo,
		formValues,
	]);

	function formatCreationDate(date) {
		const parsedDate = new Date(date);

		if (!date && isNaN(parsedDate))
			throw new Error('"date" is expected to be a valid date');

		return new Date(date).toLocaleString('en-US', {
			weekday: 'short',
			month: 'short',
			day: '2-digit',
			year: 'numeric',
		});
	}

	function handleChange(e) {
		setFormValues((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	}

	function handleToggle(e) {
		setFormValues((prevState) => ({
			...prevState,
			[e.target.name]: e.target.checked,
		}));
	}

	function handleDelete(id) {
		deleteTodo(user.uid, id);
		toggleEditMode();
	}

	function handleClose() {
		toggleEditMode();
		deselectActiveTodo();
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

	function handleSubmit(e) {
		e.preventDefault();

		const errors = validate(formValues);
		setErrors(errors);
		setFormValues((prevState) => ({
			...prevState,
			description: string(prevState.description).trim(),
		}));
		setIsSubmitted(true);
	}

	return (
		<Form
			{...setTestid('editing-form')}
			onSubmit={handleSubmit}
			className={formClassname}
		>
			<h2 className='h4 mb-24'>
				<span className='icon icon--inline mr-20'>
					<EditIcon />
				</span>
				Task editing
			</h2>
			<FormContent>
				<Button
					{...setTestid('editing-form-close-button')}
					className='button--close'
					toggle
					onClick={handleClose}
					type='button'
				>
					<span className='h4'>&times;</span>
				</Button>
				<FormGroup className='py-20'>
					<FormControl
						onChange={handleChange}
						type='text'
						name='description'
						placeholder='Description'
						value={formValues.description || ''}
						error={errors.description}
					/>
					<FormFeedback
						variant='invalid'
						message={errors.description}
					/>
				</FormGroup>
				<FormGroup>
					<FormOption
						{...setTestid('editing-form-option-my-day')}
						icon={<SunIcon />}
						defaultLabel='Add to my day'
						activeLabel='Added to my day'
						name='today'
						checked={formValues.today || false}
						changeHandler={handleToggle}
					/>
				</FormGroup>
			</FormContent>
			<FormFooter className='color-light-800'>
				{activeTodo.creationDate && (
					<small className='display-block color-light-800 mb-16'>
						Created at {formatCreationDate(activeTodo.creationDate)}
					</small>
				)}
				<Button
					{...setTestid('editing-form-save-button')}
					variant='success'
					className='mr-24'
					type='submit'
				>
					<Icon inline className='mr-12'>
						<SaveIcon />
					</Icon>
					<b>Save</b>
				</Button>
				<Button
					{...setTestid('editing-form-delete-button')}
					onClick={() => handleDelete(activeTodo.id)}
					variant='text-danger'
					type='button'
				>
					<Icon inline className='mr-12'>
						<TrashIcon />
					</Icon>
					<b>Delete</b>
				</Button>
			</FormFooter>
		</Form>
	);
}

export default EditTodoForm;
