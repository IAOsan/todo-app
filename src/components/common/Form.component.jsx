import PropTypes from 'prop-types';
import Icon from './Icon.component';
import { getClassName } from '../../utils';

function Form({ className, children }) {
	return (
		<form className={getClassName('form', { [className]: className })}>
			{children}
		</form>
	);
}

export function FormGroup({ className, children }) {
	const groupClassname = getClassName('form__group', {
		[className]: className,
	});

	return <div className={groupClassname}>{children}</div>;
}

export function FormControl({
	type,
	error,
	className,
	textarea,
	...restProps
}) {
	const inputClassname = getClassName(
		textarea ? 'form__textarea' : 'form__control',
		{
			[className]: className,
		},
		{ invalid: error }
	);

	if (textarea) {
		return <textarea className={inputClassname} {...restProps}></textarea>;
	}
	return <input className={inputClassname} type={type} {...restProps} />;
}

export function FormFeedback({ variant, className, message }) {
	const variants = {
		valid: 'form__feedback--valid',
		invalid: 'form__feedback--invalid',
	};

	return (
		<small
			className={getClassName(
				'form__feedback',
				{ [variants[variant]]: variant },
				{ [className]: className }
			)}
		>
			{message}
		</small>
	);
}

export function FormOption({
	icon,
	defaultLabel,
	activeLabel,
	checked,
	changeHandler,
	...restProps
}) {
	return (
		<label className='form__option'>
			<input
				type='checkbox'
				{...restProps}
				checked={checked}
				onChange={changeHandler}
			/>
			<span className='form__option-content'>
				{icon && (
					<Icon size='md' inline className='mr-12'>
						{icon}
					</Icon>
				)}
				<span className='form__option-default'>{defaultLabel}</span>
				<span className='form__option-active'>{activeLabel}</span>
			</span>
		</label>
	);
}

export function FormPrompt({ description, children, ...restProps }) {
	return (
		<p className='form__prompt'>
			<span className='mr-8'>{description}</span>
			{children && (
				<a {...restProps} className='link'>
					{children}
				</a>
			)}
		</p>
	);
}

export function FormFooter({ className, children }) {
	return (
		<footer
			className={getClassName('form__footer', { [className]: className })}
		>
			{children}
		</footer>
	);
}

Form.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

FormGroup.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

FormControl.propTypes = {
	type: PropTypes.string.isRequired,
	error: PropTypes.string,
	className: PropTypes.string,
	textarea: PropTypes.bool,
};

FormFeedback.propTypes = {
	variant: PropTypes.oneOf(['valid', 'invalid']).isRequired,
	className: PropTypes.string,
	message: PropTypes.string.isRequired,
};

FormOption.propTypes = {
	icon: PropTypes.element,
	defaultLabel: PropTypes.string.isRequired,
	activeLabel: PropTypes.string.isRequired,
	checked: PropTypes.bool.isRequired,
	changeHandler: PropTypes.func.isRequired,
};

FormPrompt.propTypes = {
	description: PropTypes.string.isRequired,
	children: PropTypes.string,
};

FormFooter.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default Form;
