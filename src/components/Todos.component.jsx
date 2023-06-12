import { useRef, useLayoutEffect } from 'react';
import TodosHeader from './TodosHeader.component';
import TodosRibbon from './TodosRibbon.component';
import Icon from './common/Icon.component';
import SidebarToggler from './SidebarToggler.component';
import TodosMenu from './TodosMenu.component';
import TodosList from './TodosList.component';
import TodosItem from './TodosItem.component';
import NewTodoForm from './NewTodoForm.component';
import { useAppContext } from '../context/App.context';
import { useListsContext } from '../context/Lists.context';
import { useTodosContext } from '../context/Todos.context';
import { getClassName, accessibleOnClick } from '../utils';
import { InfiniteIcon, StarIcon, SunIcon } from '../icons';

function Todos() {
	const { isEditModeActive, handleEditModeToggle } = useAppContext();
	const { activeList } = useListsContext();
	const { todos, activeTodo, selectTodo } = useTodosContext();
	const headerRef = useRef();
	const listRef = useRef();
	const icons = {
		sun: <SunIcon />,
		star: <StarIcon />,
		infinite: <InfiniteIcon />,
	};

	useLayoutEffect(() => {
		const headerHeight = headerRef.current.offsetHeight;
		// 104 = space + form + space
		const offsetHeight = (headerHeight + 104) / 10 + 'rem';

		listRef.current.style = `--listHeight: calc(100vh - ${offsetHeight})`;
	}, [activeList]);

	function handleItemClick(id) {
		selectTodo(id);
		handleEditModeToggle();
	}

	return (
		<section
			className={getClassName('todos', {
				'todos--edit-mode': isEditModeActive,
			})}
		>
			<TodosHeader variant={activeList.theme} ref={headerRef}>
				<TodosRibbon>
					<SidebarToggler />
					<TodosMenu />
				</TodosRibbon>
				<h1
					className={getClassName('h3', {
						'mb-8': activeList.displayDate,
					})}
				>
					{activeList.displayIcon && (
						<Icon inline className='mr-20'>
							{icons[activeList.icon]}
						</Icon>
					)}
					{activeList.label}
				</h1>
				{activeList.displayDate && (
					<p className='h5'>Thursday, September 28</p>
				)}
			</TodosHeader>
			{/* TODO agregar una clase activa al item cuando se este editando */}
			{/* TODO eliminar la clase activa cuando se cierra el formulario de edicion */}
			<TodosList ref={listRef}>
				{todos.map((o) => (
					<TodosItem
						key={o.id}
						{...accessibleOnClick(() => handleItemClick(o.id))}
						description={o.description}
						metadata={{ origin: 'Today' }}
						active={activeTodo.id === o.id}
					/>
				))}
			</TodosList>
			<NewTodoForm variant={activeList.theme} />
		</section>
	);
}

export default Todos;
