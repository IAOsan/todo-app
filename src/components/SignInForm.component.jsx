import PropTypes from 'prop-types';
import Form, {
	FormGroup,
	FormControl,
	FormPrompt,
} from './common/Form.component';
import Button from './common/Button.component';
import { getClassName } from '../utils';

function SignInForm({ visible, clickHandler }) {
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
				<h2 className='h2 text-center mb-24'>Welcome</h2>
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
					<h2 className='h2 mb-12'>Welcome back</h2>
					<p className='mb-40'>Already have an account? Sign in</p>
					<Button
						clickHandler={clickHandler}
						variant='light'
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
