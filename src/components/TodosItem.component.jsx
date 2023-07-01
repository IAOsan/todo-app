import PropTypes from 'prop-types';
import { getClassName, setTestid } from '../utils';

function TodosItem({
	id,
	description,
	completed,
	active,
	today,
	onToggleComplete,
	...restProps
}) {
	function getMetadata() {
		return `${today ? 'Today' : ''}`;
	}

	return (
		<li
			{...setTestid('todositem')}
			{...restProps}
			className={getClassName('todos__item', { active: active })}
		>
			<form className='flex flex-ai-c'>
				<label
					className='form__checkbox form__checkbox--todos mr-20'
					{...setTestid('todoitem-check')}
				>
					<input
						onChange={() => onToggleComplete(id, !completed)}
						{...setTestid('todoitem-check-element')}
						type='checkbox'
						name='checked'
						checked={completed}
					/>
					<div className='form__checkbox-checkmark'></div>
				</label>
				<div>
					{completed ? (
						<s className='h5 display-block'>{description}</s>
					) : (
						<p className='h5'>{description}</p>
					)}
					<small
						{...setTestid('todositem-metadata')}
						className='color-light-800'
					>
						{getMetadata()}
					</small>
				</div>
			</form>
		</li>
	);
}

TodosItem.propTypes = {
	active: PropTypes.bool.isRequired,
	completed: PropTypes.bool.isRequired,
	description: PropTypes.string.isRequired,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	onToggleComplete: PropTypes.func.isRequired,
	today: PropTypes.bool.isRequired,
};

export default TodosItem;
