import PropTypes from 'prop-types';
import Form, {
	FormGroup,
	FormControl,
	FormPrompt,
} from './common/Form.component';
import Button from './common/Button.component';
import { getClassName } from '../utils';

function SignUpForm({ visible, clickHandler }) {
	const formClassname = getClassName('form--auth', {
		visible: visible,
	});
	const overlayClassname = getClassName(
		'auth-page__overlay bgcolor-info-500 color-light-500',
		{ visible: !visible }
	);

	return (
		<>
			<Form className={formClassname}>
				<h2 className='h2 text-center mb-24'>Create your account</h2>
				<FormGroup>
					<FormControl
						type='text'
						name='username'
						placeholder='Username'
						required
					/>
				</FormGroup>
				<FormGroup>
					<FormControl
						type='email'
						name='email'
						placeholder='Email'
						required
					/>
				</FormGroup>
				<FormGroup>
					<FormControl
						type='password'
						name='password'
						placeholder='Password'
						required
					/>
				</FormGroup>
				<FormGroup>
					<FormControl
						type='password'
						name='repeatPassword'
						placeholder='Repeat password'
						required
					/>
				</FormGroup>
				<Button variant='info' className='mb-16' block type='submit'>
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
			<div className={overlayClassname}>
				<div className='flex flex-column flex-ai-c flex-jc-c h-100'>
					<h2 className='h2 mb-12'>Hello</h2>
					<p className='mb-40'>No account?, sign up for free</p>
					<Button
						clickHandler={clickHandler}
						variant='light'
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
