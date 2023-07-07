import PropTypes from 'prop-types';
import Button from './common/Button.component';
import { setTestid } from '../utils';

function DeletePrompt({ onCancel, onConfirm }) {
	return (
		<>
			<small className='display-block mb-24'>
				Are you sure you want to do that?
			</small>
			<div className='flex flex-jc-sb'>
				<Button
					onClick={onCancel}
					variant='text'
					size='sm'
					type='button'
					className='mr-12'
					{...setTestid('cancel-confirmation')}
				>
					<b>Cancel</b>
				</Button>
				<Button
					onClick={onConfirm}
					variant='info'
					size='sm'
					type='button'
					{...setTestid('delete-confirmation')}
				>
					<b>Delete</b>
				</Button>
			</div>
		</>
	);
}

DeletePrompt.propTypes = {
	onCancel: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired,
};

export default DeletePrompt;
