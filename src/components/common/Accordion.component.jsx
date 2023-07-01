import {
	Children,
	cloneElement,
	isValidElement,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import PropTypes from 'prop-types';
import Button from './Button.component';
import { getClassName } from '../../utils';

function Accordion({ className, children }) {
	const [activeItem, setActiveItem] = useState(null);

	function handleItemClick(id) {
		setActiveItem((prevState) => {
			return id === prevState ? null : id;
		});
	}

	return (
		<ul className={getClassName('accordion', { [className]: className })}>
			{Children.map(children, (child) => {
				if (child && child.type === AccordionItem) {
					return cloneElement(child, {
						active: activeItem,
						clickHandler: handleItemClick,
					});
				}
				return child;
			})}
		</ul>
	);
}

export function AccordionItem({
	id,
	className,
	single,
	active,
	clickHandler,
	children,
}) {
	const itemClassname = getClassName(
		'accordion__item',
		{
			'accordion__item--single': single,
		},
		{
			[className]: className,
		},
		{
			active: active === id,
		}
	);

	function handleChildClick(child) {
		if (!child.props.clickHandler) {
			return cloneElement(child, {
				clickHandler: () => clickHandler(id),
			});
		}

		return child;
	}

	return (
		<li className={itemClassname}>
			{Children.map(children, (child) => {
				if (!isValidElement(child) && child.type !== AccordionHeader) {
					return child;
				}
				return handleChildClick(child);
			})}
		</li>
	);
}

export function AccordionHeader({ className, clickHandler, children }) {
	return (
		<Button
			onClick={clickHandler}
			className={getClassName('button--accordion', {
				[className]: className,
			})}
			type='button'
			block
		>
			{children}
		</Button>
	);
}

export function AccordionBody({ className, children }) {
	const [height, setHeight] = useState(0);
	const style = {
		'--panelHeight': `${height}px`,
	};
	const ref = useRef();

	useLayoutEffect(() => {
		setHeight(ref.current.scrollHeight);
	}, []);

	return (
		<div
			className={getClassName('accordion__panel', {
				[className]: className,
			})}
			ref={ref}
			style={style}
		>
			{children}
		</div>
	);
}

Accordion.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

AccordionItem.propTypes = {
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	className: PropTypes.string,
	single: PropTypes.bool,
	active: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	clickHandler: PropTypes.func,
	children: PropTypes.node.isRequired,
};

AccordionHeader.propTypes = {
	className: PropTypes.string,
	clickHandler: PropTypes.func,
	children: PropTypes.node.isRequired,
};

AccordionBody.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default Accordion;
