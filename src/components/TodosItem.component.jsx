import PropTypes from 'prop-types';
import { StarFilledIcon, StarIcon } from '../icons';
import { getClassName } from '../utils';

function TodosItem({ description, metadata, active, ...restProps }) {
	return (
		<li
			{...restProps}
			className={getClassName('todos__item', { active: active })}
		>
			<form className='flex flex-ai-c'>
				<label className='form__checkbox form__checkbox--todos mr-20'>
					<input type='checkbox' name='checked' />
					<div className='form__checkbox-checkmark'></div>
				</label>
				<div>
					<p className='h5'>{description}</p>
					<small className='color-light-800'>{metadata.origin}</small>
				</div>
				<label className='todos__important-mark ml-auto'>
					<input type='checkbox' name='important' />
					<span className='icon icon--xl'>
						<StarFilledIcon />
					</span>
					<span className='icon icon--xl'>
						<StarIcon />
					</span>
				</label>
			</form>
		</li>
	);
}

TodosItem.propTypes = {
	description: PropTypes.string.isRequired,
	metadata: PropTypes.shape({
		origin: PropTypes.string.isRequired,
	}).isRequired,
	active: PropTypes.bool,
};

export default TodosItem;
