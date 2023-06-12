import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import AppContextProvider from './context/App.context.jsx';
import ListsContextProvider from './context/Lists.context.jsx';
import TodosContextProvider from './context/Todos.context.jsx';
import './main.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<AppContextProvider>
				<ListsContextProvider>
					<TodosContextProvider>
						<App />
					</TodosContextProvider>
				</ListsContextProvider>
			</AppContextProvider>
		</BrowserRouter>
	</React.StrictMode>
);
