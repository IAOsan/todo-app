import React from 'react';
import PropTypes from 'prop-types';
import { getClassName } from '../utils';

const TodosHeader = React.forwardRef(({ variant, children }, ref) => {
	const variants = {
		primary: 'bgcolor-primary-500 color-light-500',
		secondary: 'bgcolor-secondary-600 color-light-500',
		warning: 'bgcolor-warning-500',
		info: 'bgcolor-info-500 color-light-50',
	};
	const headerClassname = getClassName('todos__header', {
		[variants[variant]]: variant,
	});

	return (
		<header ref={ref} className={headerClassname}>
			{children}
		</header>
	);
});

TodosHeader.displayName = 'TodosHeader';
TodosHeader.propTypes = {
	variant: PropTypes.oneOf(['primary', 'secondary', 'warning', 'info']),
	children: PropTypes.node.isRequired,
};

export default TodosHeader;
