import { useRef, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import TodosHeader from './TodosHeader.component';
import TodosRibbon from './TodosRibbon.component';
import Icon from './common/Icon.component';
import SidebarToggler from './SidebarToggler.component';
import TodosList from './TodosList.component';
import TodosItem from './TodosItem.component';
import NewTodoForm from './NewTodoForm.component';
import { useAppContext } from '../context/App.context';
import { useTodosContext } from '../context/Todos.context';
import { useListsContext } from '../context/Lists.context';
import { getClassName, accessibleOnClick, capitalize } from '../utils';
import { EmptyIcon } from '../icons';

function Todos({ icons, todosList }) {
	const { isEditModeActive, toggleEditMode, user } = useAppContext();
	const {
		activeTodo,
		selectActiveTodo,
		toggleCompleteTodo,
		toggleImportantTodo,
	} = useTodosContext();
	const { activeList } = useListsContext();
	const { tag } = useParams();
	const filteredTodos = todosList[tag];
	const headerRef = useRef();
	const listRef = useRef();

	useLayoutEffect(() => {
		if (!headerRef.current || !listRef.current) return;

		const headerHeight = headerRef.current.offsetHeight;
		// 104 = space + form + space
		const offsetHeight = (headerHeight + 104) / 10 + 'rem';
		listRef.current.style = `--listHeight: calc(100vh - ${offsetHeight})`;
	}, [activeList]);

	function handleItemClick(id) {
		selectActiveTodo(id);
		toggleEditMode();
	}

	function handleToggleComplete(id, completed) {
		toggleCompleteTodo({
			uid: user.uid,
			id,
			// completed: completed,
			completed,
		});
	}

	function handleToggleImportant(id, important) {
		toggleImportantTodo({
			uid: user.uid,
			id,
			important,
		});
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
					{activeList.label && capitalize(activeList.label)}
				</h1>
				{activeList.displayDate && (
					<p className='h5'>
						{new Date().toLocaleString('en-US', {
							weekday: 'long',
							month: 'long',
							day: 'numeric',
						})}
					</p>
				)}
			</TodosHeader>
			<TodosList ref={listRef}>
				{!filteredTodos.length ? (
					<li className='h-100 w-80 mx-auto flex flex-column flex-ai-c flex-jc-c text-center color-light-800'>
						<Icon size='display-3'>
							<EmptyIcon />
						</Icon>
						<p className='h3'>
							<b>No todos yet</b>
						</p>
						<p>
							it looks like it&apos;s empty, new tasks you add
							will appear here
						</p>
					</li>
				) : (
					filteredTodos.map((o) => (
						<TodosItem
							key={o.id}
							{...accessibleOnClick(() => handleItemClick(o.id))}
							id={o.id}
							description={o.description}
							completed={o.completed}
							active={activeTodo.id === o.id}
							today={o.today}
							important={o.important}
							onToggleComplete={handleToggleComplete}
							onToggleImportant={handleToggleImportant}
						/>
					))
				)}
			</TodosList>
			<NewTodoForm variant={activeList.theme} />
		</section>
	);
}

Todos.propTypes = {
	icons: PropTypes.object.isRequired,
	todosList: PropTypes.object.isRequired,
};

export default Todos;
