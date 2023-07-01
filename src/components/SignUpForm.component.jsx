import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Form, {
	FormGroup,
	FormControl,
	FormPrompt,
	FormFeedback,
} from './common/Form.component';
import Button from './common/Button.component';
import { useAppContext } from '../context/App.context';
import {
	getClassName,
	setTestid,
	isEmptyObject,
	Validator,
	string,
} from '../utils';

function SignUpForm({ visible, clickHandler }) {
	const { register } = useAppContext();
	const [formValues, setFormValues] = useState({
		username: '',
		email: '',
		password: '',
		repeatPassword: '',
	});
	const [errors, setErrors] = useState({});
	const [isSubmitted, setIsSubmitted] = useState(false);
	const formClassname = getClassName('form--auth', {
		visible: visible,
	});
	const overlayClassname = getClassName(
		'auth-page__overlay bgcolor-info-500 color-light-500',
		{ visible: !visible }
	);

	useEffect(() => {
		if (isEmptyObject(errors) && isSubmitted) {
			try {
				register(formValues);
			} catch (error) {
				if (error.code === 400) {
					setErrors({ email: error.message });
				}
			} finally {
				setIsSubmitted(false);
			}
		}
	}, [errors, isSubmitted, formValues, register]);

	function validate(formData) {
		const err = {
			username: new Validator(formData.username)
				.label('Username')
				.required()
				.string()
				.min(4)
				.trim().error,
			email: new Validator(formData.email)
				.label('Email')
				.required()
				.email().error,
			password: new Validator(formData.password)
				.label('Password')
				.required()
				.alphanum()
				.min(8)
				.max(20).error,
			repeatPassword: new Validator(formData.repeatPassword)
				.label('Repeat password')
				.equal({ password: formValues.password }).error,
		};

		for (const key in err) {
			if (err[key]) {
				return { [key]: err[key] };
			}
		}

		return {};
	}

	function handleChange({ target }) {
		const { name, value } = target;

		setFormValues((prevState) => ({
			...prevState,
			[name]: value,
		}));
	}

	function handleSubmit(e) {
		e.preventDefault();

		const errors = validate(formValues);
		setErrors(errors);
		setFormValues((prevState) => ({
			username: string(prevState.username).trim(),
			email: string(prevState.email).trim(),
			password: string(prevState.password).trim(),
			repeatPassword: string(prevState.repeatPassword).trim(),
		}));
		setIsSubmitted(true);
	}

	return (
		<>
			<Form
				onSubmit={handleSubmit}
				{...setTestid('signup-form')}
				className={formClassname}
			>
				<h2
					{...setTestid('signup-form-title')}
					className='h2 text-center mb-24'
				>
					Create your account
				</h2>
				<FormGroup>
					<FormControl
						{...setTestid('signup-form-username-input')}
						onChange={handleChange}
						type='text'
						name='username'
						placeholder='Username'
						value={formValues.username}
						error={errors.username}
					/>
					<FormFeedback variant='invalid' message={errors.username} />
				</FormGroup>
				<FormGroup>
					<FormControl
						{...setTestid('signup-form-email-input')}
						onChange={handleChange}
						type='email'
						name='email'
						placeholder='Email'
						value={formValues.email}
						error={errors.email}
					/>
					<FormFeedback variant='invalid' message={errors.email} />
				</FormGroup>
				<FormGroup>
					<FormControl
						{...setTestid('signup-form-password-input')}
						onChange={handleChange}
						type='password'
						name='password'
						placeholder='Password'
						value={formValues.password}
						error={errors.password}
					/>
					<FormFeedback variant='invalid' message={errors.password} />
				</FormGroup>
				<FormGroup>
					<FormControl
						{...setTestid('signup-form-repeatpassword-input')}
						onChange={handleChange}
						type='password'
						name='repeatPassword'
						placeholder='Repeat password'
						value={formValues.repeatPassword}
						error={errors.repeatPassword}
					/>
					<FormFeedback
						variant='invalid'
						message={errors.repeatPassword}
					/>
				</FormGroup>
				<Button
					{...setTestid('signup-form-submit')}
					variant='info'
					className='mb-16'
					block
					type='submit'
				>
					Sign in
				</Button>
				<FormPrompt
					description='Don`t have an account yet?'
					href='/'
					onClick={clickHandler}
				>
					Sign Up
				</FormPrompt>
			</Form>
			<div
				{...setTestid('signup-form-overlay')}
				className={overlayClassname}
			>
				<div className='flex flex-column flex-ai-c flex-jc-c h-100'>
					<h2 className='h2 mb-12'>Hello</h2>
					<p className='mb-40'>No account?, sign up for free</p>
					<Button
						{...setTestid('signup-form-overlay-button')}
						onClick={clickHandler}
						variant='text'
						rounded
						type='button'
					>
						<b>Sign up</b>
					</Button>
				</div>
			</div>
		</>
	);
}

SignUpForm.propTypes = {
	visible: PropTypes.bool,
	clickHandler: PropTypes.func,
};

export default SignUpForm;
