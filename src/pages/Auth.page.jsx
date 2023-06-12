import { useState } from 'react';
import SignInForm from '../components/SignInForm.component';
import SignUpForm from '../components/SignUpForm.component';
import { getClassName } from '../utils';

function Auth() {
	const [isFirstColumnVisible, setIsFirstColumnVisible] = useState(true);

	function handleFormToggle(e) {
		e.preventDefault();
		setIsFirstColumnVisible((prevState) => !prevState);
	}

	return (
		<main className='auth-page flex flex-ai-c flex-jc-c'>
			<div className='auth-page__content'>
				<div
					className={getClassName('auth-page__col', {
						visible: isFirstColumnVisible,
					})}
				>
					<SignInForm
						visible={isFirstColumnVisible}
						clickHandler={handleFormToggle}
					/>
				</div>
				<div
					className={getClassName('auth-page__col', {
						visible: !isFirstColumnVisible,
					})}
				>
					<SignUpForm
						visible={!isFirstColumnVisible}
						clickHandler={handleFormToggle}
					/>
				</div>
			</div>
		</main>
	);
}

export default Auth;
