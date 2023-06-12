import Form, {
	FormGroup,
	FormControl,
	FormOption,
	FormFooter,
} from './common/Form.component';
import Button from './common/Button.component';
import Icon from './common/Icon.component';
import { useAppContext } from '../context/App.context';
import { getClassName } from '../utils';
import {
	EditIcon,
	RightArrowIcon,
	StarIcon,
	SunIcon,
	TrashIcon,
} from '../icons';

function EditTodoForm() {
	const { isEditModeActive, handleEditModeToggle } = useAppContext();
	const formClassname = getClassName('form--edit-todo bgcolor-light-500', {
		visible: isEditModeActive,
	});

	return (
		<>
			<Form className={formClassname}>
				<h2 className='h3 mb-24'>
					<span className='icon icon--inline mr-20'>
						<EditIcon />
					</span>
					Task editing
				</h2>
				<Button
					className='button--close'
					toggle
					clickHandler={handleEditModeToggle}
					type='button'
				>
					<span className='h4'>&times;</span>
				</Button>
				<FormGroup className='py-20'>
					<FormControl
						type='text'
						name='description'
						placeholder='Description'
					/>
				</FormGroup>
				<FormGroup>
					<FormOption
						icon={<SunIcon />}
						defaultLabel='Add to my day'
						activeLabel='Added to my day'
						name='myDay'
						checked={false}
						changeHandler={() => {}}
					/>
					<FormOption
						icon={<StarIcon />}
						defaultLabel='Mark as important'
						activeLabel='Marked as important'
						name='myDay'
						checked={false}
						changeHandler={() => {}}
					/>
				</FormGroup>
				<FormGroup className='py-20'>
					<FormControl
						type='text'
						name='note'
						placeholder='Add a note'
						textarea
					/>
				</FormGroup>
				<FormFooter className='color-light-800'>
					<div className='flex flex-ai-c flex-jc-sb'>
						<Icon>
							<RightArrowIcon />
						</Icon>
						<p>Created at Fri, Jan 8, 2021</p>
						<Button toggle className='button--delete'>
							<Icon inline>
								<TrashIcon />
							</Icon>
						</Button>
					</div>
				</FormFooter>
			</Form>
		</>
	);
}

export default EditTodoForm;
