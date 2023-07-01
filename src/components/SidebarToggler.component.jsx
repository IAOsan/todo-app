import { MenuIcon } from '../icons';
import Button from './common/Button.component';
import Icon from './common/Icon.component';
import { useAppContext } from '../context/App.context';
import { setTestid } from '../utils';

function SidebarToggler() {
	const { toggleSidebar } = useAppContext();

	return (
		<Button
			onClick={toggleSidebar}
			toggle
			className='d-md-none'
			type='button'
			{...setTestid('sidebar-toggler')}
		>
			<Icon size='md' inline>
				<MenuIcon />
			</Icon>
		</Button>
	);
}

export default SidebarToggler;
