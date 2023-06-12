import PropTypes from 'prop-types';

function TodosRibbon({ children }) {
	return (
		<div className='todos__ribbon flex flex-ai-c flex-jc-sb mb-16'>
			{children}
		</div>
	);
}

TodosRibbon.propTypes = {
	children: PropTypes.node.isRequired,
};

export default TodosRibbon;
