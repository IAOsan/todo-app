import PropTypes from 'prop-types';
import { getClassName, setTestid } from '../../utils';

function Popup({ toggler, position, visible, children }) {
	const positions = {
		left: 'popup--left',
	};
	const containerClassname = getClassName(
		'popup',
		{
			[positions[position]]: positions[position],
		},
		{ visible: visible }
	);

	return (
		<div className={containerClassname} {...setTestid('popup')}>
			{toggler}
			<div className='popup__content'>{children}</div>
		</div>
	);
}

Popup.propTypes = {
	toggler: PropTypes.element.isRequired,
	position: PropTypes.oneOf(['left']).isRequired,
	visible: PropTypes.bool.isRequired,
	children: PropTypes.node.isRequired,
};

export default Popup;
