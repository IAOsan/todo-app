import { useNavigate } from 'react-router-dom';
import UserProfileCard from './UserProfileCard.component.jsx';
import Nav, { NavItem, NavList, NavLink } from './common/Nav.component';
import Icon from './common/Icon.component';
import { useAppContext } from '../context/App.context';
import { useListsContext } from '../context/Lists.context.jsx';
import { getClassName, capitalize } from '../utils';
import { SunIcon, StarIcon, InfiniteIcon } from '../icons.js';

function Sidebar() {
	const navigate = useNavigate();
	const { isSidebarOpen, handleSidebarToggle } = useAppContext();
	const { lists, selectList } = useListsContext();
	const icons = {
		sun: <SunIcon />,
		star: <StarIcon />,
		infinite: <InfiniteIcon />,
	};

	function handleLinkClick(e, label) {
		e.preventDefault();

		navigate(e.target.pathname);
		selectList(label);
		handleSidebarToggle();
	}

	return (
		<aside className={getClassName('sidebar', { active: isSidebarOpen })}>
			<div className='sidebar__content'>
				<header className='sidebar__header'>
					<UserProfileCard />
				</header>
				<Nav className='sidenav'>
					<NavList>
						{lists.map((o) => (
							<NavItem key={o.label} className='sidenav__item'>
								<NavLink
									onClick={(e) => handleLinkClick(e, o.label)}
									to={`/todos/${o.label}`}
									className={({ isActive }) =>
										getClassName(
											'sidenav__link h5 flex flex-ai-c',
											{ active: isActive }
										)
									}
								>
									<Icon size='xl' className='mr-20'>
										{icons[o.icon]}
									</Icon>
									{capitalize(o.label)}
									<span className='ml-auto color-light-800'>
										8
									</span>
								</NavLink>
							</NavItem>
						))}
					</NavList>
				</Nav>
			</div>
		</aside>
	);
}

export default Sidebar;
