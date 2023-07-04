import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserProfileCard from './UserProfileCard.component.jsx';
import Nav, { NavItem, NavList, NavLink } from './common/Nav.component';
import { useAppContext } from '../context/App.context';
import { useListsContext } from '../context/Lists.context.jsx';
import { getClassName, capitalize, setTestid } from '../utils';
import Icon from './common/Icon.component';

function Sidebar({ icons, todosList }) {
	const { isSidebarOpen, toggleSidebar } = useAppContext();
	const { lists, selectList } = useListsContext();
	const navigate = useNavigate();

	function handleLinkClick(e) {
		e.preventDefault();
		const { label, path } = e.target.dataset;

		if (!label || !path) return;

		navigate(path);
		selectList(label);
		toggleSidebar();
	}

	return (
		<aside
			{...setTestid('sidebar')}
			className={getClassName('sidebar', { active: isSidebarOpen })}
		>
			<div className='sidebar__content'>
				<header className='sidebar__header'>
					<UserProfileCard />
				</header>
				<hr />
				<Nav className='sidenav'>
					<NavList>
						{lists.map((o) => (
							<NavItem key={o.label} className='sidenav__item'>
								<NavLink
									onClick={handleLinkClick}
									to={`/todos/${o.label}`}
									data-path={`/todos/${o.label}`}
									data-label={o.label}
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
									<span
										{...setTestid(`todos-count-${o.label}`)}
										className='ml-auto color-light-800'
									>
										{todosList[o.label].length}
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

Sidebar.propTypes = {
	icons: PropTypes.object.isRequired,
	todosList: PropTypes.object.isRequired,
};

export default Sidebar;
