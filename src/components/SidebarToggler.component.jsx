import { MenuIcon } from '../icons';
import Button from './common/Button.component';
import Icon from './common/Icon.component';
import { useAppContext } from '../context/App.context';

function SidebarToggler() {
	const { handleSidebarToggle } = useAppContext();

	return (
		<Button
			clickHandler={handleSidebarToggle}
			toggle
			className='d-md-none'
			type='button'
		>
			<Icon size='md' inline>
				<MenuIcon />
			</Icon>
		</Button>
	);
}

export default SidebarToggler;
