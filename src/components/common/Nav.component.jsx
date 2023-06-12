import { NavLink as Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getClassName } from '../../utils';

function Nav({ className, children }) {
	return (
		<nav className={getClassName({ [className]: className })}>
			{children}
		</nav>
	);
}

export function NavList({ className, children }) {
	return (
		<ul className={getClassName({ [className]: className })}>{children}</ul>
	);
}

export function NavItem({ className, children, ...restProps }) {
	return (
		<li className={getClassName({ [className]: className })} {...restProps}>
			{children}
		</li>
	);
}

export function NavLink({ children, ...restProps }) {
	return <Link {...restProps}>{children}</Link>;
}

Nav.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

NavList.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

NavItem.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

NavLink.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Nav;
