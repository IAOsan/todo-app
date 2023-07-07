import PropTypes from 'prop-types';
import Icon from './common/Icon.component';
import { getClassName, setTestid } from '../utils';
import { StarFilledIcon, StarIcon } from '../icons';

function TodosItem({
	id,
	description,
	completed,
	active,
	today,
	important,
	onToggleComplete,
	onToggleImportant,
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
						name='completed'
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
				<label className='todos__important-mark ml-auto'>
					<input
						{...setTestid('todoitem-check-important')}
						onChange={() => onToggleImportant(id, !important)}
						type='checkbox'
						name='important'
						checked={important}
					/>
					<Icon size='xl'>
						<StarFilledIcon />
					</Icon>
					<Icon size='xl'>
						<StarIcon />
					</Icon>
				</label>
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
	onToggleImportant: PropTypes.func.isRequired,
	today: PropTypes.bool.isRequired,
	important: PropTypes.bool.isRequired,
};

export default TodosItem;
