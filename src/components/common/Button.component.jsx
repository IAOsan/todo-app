import PropTypes from 'prop-types';
import { getClassName } from '../../utils';

function Button({
	variant,
	block,
	rounded,
	toggle,
	className,
	clickHandler,
	children,
	...restProps
}) {
	const variants = {
		'info': 'button--info',
		'success': 'button--success',
		'text-danger': 'button--text-danger',
		'text': 'button--text',
	};
	const classNames = getClassName(
		'button',
		{ [variants[variant]]: variant },
		{ 'button--block': block },
		{ 'button--rounded': rounded },
		{ 'button--toggle': toggle },
		{ [className]: className }
	);

	return (
		<button className={classNames} onClick={clickHandler} {...restProps}>
			{children}
		</button>
	);
}

Button.propTypes = {
	variant: PropTypes.oneOf(['info', 'text', 'success', 'text-danger']),
	block: PropTypes.bool,
	rounded: PropTypes.bool,
	toggle: PropTypes.bool,
	className: PropTypes.string,
	clickHandler: PropTypes.func,
	children: PropTypes.node.isRequired,
};

export default Button;
