import React from 'react';
import PropTypes from 'prop-types';

const TodosList = React.forwardRef(({ children, ...restProps }, ref) => {
	return (
		<ul ref={ref} className='todos__list' {...restProps}>
			{children}
		</ul>
	);
});

TodosList.displayName = 'TodosList';

TodosList.propTypes = {
	children: PropTypes.node.isRequired,
};

export default TodosList;
