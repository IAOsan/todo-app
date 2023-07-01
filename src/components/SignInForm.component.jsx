import { useState, useEffect } from 'react';
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
	Validator,
	string,
	isEmptyObject,
} from '../utils';

function SignInForm({ visible, clickHandler }) {
	const { login } = useAppContext();
	const [formValues, setFormValues] = useState({
		email: '',
		password: '',
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
				login(formValues);
			} catch (error) {
				if (error.code === 404) {
					setErrors({ email: error.message });
				}
				if (error.code === 400) {
					setErrors({ password: error.message });
				}
			} finally {
				setIsSubmitted(false);
			}
		}
	}, [errors, isSubmitted, formValues, login]);

	function validate(formData) {
		const err = {
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
			email: string(prevState.email).trim(),
			password: string(prevState.password).trim(),
		}));
		setIsSubmitted(true);
	}

	return (
		<>
			<Form
				{...setTestid('signin-form')}
				onSubmit={handleSubmit}
				className={formClassname}
			>
				<h2
					className='h2 text-center mb-24'
					{...setTestid('sigin-form-title')}
				>
					Welcome
				</h2>
				<FormGroup>
					<FormControl
						{...setTestid('signin-form-email-input')}
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
						{...setTestid('signin-form-password-input')}
						onChange={handleChange}
						type='password'
						name='password'
						placeholder='Password'
						value={formValues.password}
						error={errors.password}
					/>
					<FormFeedback variant='invalid' message={errors.password} />
				</FormGroup>
				<Button
					{...setTestid('sigin-form-submit')}
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
				{...setTestid('signin-form-overlay')}
				className={overlayClassname}
			>
				<div className='flex flex-column flex-ai-c flex-jc-c h-100'>
					<h2 className='h2 mb-12'>Welcome back</h2>
					<p className='mb-40'>Already have an account? Sign in</p>
					<Button
						{...setTestid('signin-form-overlay-button')}
						onClick={clickHandler}
						variant='text'
						rounded
						type='button'
					>
						<b>Sign in</b>
					</Button>
				</div>
			</div>
		</>
	);
}

SignInForm.propTypes = {
	visible: PropTypes.bool,
	clickHandler: PropTypes.func,
};

export default SignInForm;
