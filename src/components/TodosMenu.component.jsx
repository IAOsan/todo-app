import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './common/Button.component';
import Icon from './common/Icon.component';
import Accordion, {
	AccordionItem,
	AccordionHeader,
	AccordionBody,
} from './common/Accordion.component';
import { OptionsIcon, SortIcon } from '../icons';
import { getClassName, setTestid } from '../utils';

function TodosMenu({ userList }) {
	const [isVisible, setIsVisible] = useState(false);
	const menuClassname = getClassName('todos__menu', {
		visible: isVisible,
	});

	function handleMenuToggle() {
		setIsVisible((prevState) => !prevState);
	}

	return (
		<>
			<Button
				onClick={handleMenuToggle}
				toggle
				type='button'
				{...setTestid('menu-toggler')}
			>
				<Icon size='md' inline>
					<OptionsIcon />
				</Icon>
			</Button>
			<div
				hidden={!isVisible}
				className={menuClassname}
				{...setTestid('todos-menu')}
			>
				<Accordion className='accordion--menu'>
					{userList && (
						<AccordionItem id={1} single>
							<AccordionHeader
								clickHandler={() => console.log('rename list')}
							>
								<Icon className='mr-16' inline>
									<SortIcon />
								</Icon>
								Rename list
							</AccordionHeader>
						</AccordionItem>
					)}
					<AccordionItem id={20}>
						<AccordionHeader>
							<Icon className='mr-16' inline>
								<SortIcon />
							</Icon>
							Sort
						</AccordionHeader>
						<AccordionBody>
							<AccordionHeader
								clickHandler={() => console.log('importance')}
							>
								Importance
							</AccordionHeader>
							<AccordionHeader
								clickHandler={() => console.log('my day')}
							>
								Added to my day
							</AccordionHeader>
							<AccordionHeader
								clickHandler={() => console.log('completed')}
							>
								Completed
							</AccordionHeader>
							<AccordionHeader
								clickHandler={() => console.log('letters')}
							>
								Alphabetically
							</AccordionHeader>
							<AccordionHeader
								clickHandler={() => console.log('date')}
							>
								Creation date
							</AccordionHeader>
						</AccordionBody>
					</AccordionItem>
					<AccordionItem id={30} single>
						<AccordionHeader
							clickHandler={() => console.log('hide completed')}
						>
							<Icon className='mr-16' inline>
								<SortIcon />
							</Icon>
							Hide completed tasks
						</AccordionHeader>
					</AccordionItem>
					{userList && (
						<>
							<hr />
							<AccordionItem id={40} single>
								<AccordionHeader
									clickHandler={() =>
										console.log('delete list')
									}
								>
									<Icon className='mr-16' inline>
										<SortIcon />
									</Icon>
									Delete list
								</AccordionHeader>
							</AccordionItem>
						</>
					)}
				</Accordion>
			</div>
		</>
	);
}

TodosMenu.propTypes = {
	userList: PropTypes.bool,
};

export default TodosMenu;
