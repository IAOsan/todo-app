import Sidebar from '../components/Sidebar.component';
import Todos from '../components/Todos.component';
import EditTodoForm from '../components/EditTodoForm.component';

function View() {
	return (
		<main>
			<Sidebar />
			<Todos />
			<EditTodoForm />
		</main>
	);
}

export default View;
