import PropTypes from 'prop-types';

function Avatar({ userName, image }) {
	function getInitials(str) {
		const splittedStr = str.split(' ');
		return splittedStr.map((v) => v[0].toUpperCase()).join('');
	}

	return (
		<div className='avatar bgcolor-info-600 color-light-500 mr-16'>
			{userName && !image && (
				<b className='avatar__username h5'>{getInitials(userName)}</b>
			)}
			{image && <img src={image} alt={`${userName || 'User'} avatar`} />}
		</div>
	);
}

Avatar.propTypes = {
	userName: PropTypes.string.isRequired,
	image: PropTypes.string,
};

export default Avatar;
