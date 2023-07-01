import { createContext, useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import authService from '../services/auth.service';

export const AppContext = createContext();
export const useAppContext = () => {
	const context = useContext(AppContext);

	if (!context)
		throw new Error(
			'"useAppContext" must be called in "AppContextProvider"'
		);

	return context;
};

function AppContextProvider({ children }) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isEditModeActive, setIsEditModeActive] = useState(false);
	const [user, setUser] = useState(null);
	const memoized = useRef({
		initialList: 'Today',
		register,
		loginUser,
	});

	function toggleSidebar() {
		setIsSidebarOpen((prevState) => !prevState);
	}

	function toggleEditMode() {
		setIsEditModeActive((prevState) => !prevState);
	}

	function register(credentials) {
		const user = authService.registerWithEmail(credentials);
		loginUser(user);
	}

	function login(credentials) {
		const user = authService.loginWithEmail(credentials);
		loginUser(user);
	}

	function loginUser(user) {
		setUser(user);
	}

	function logOut() {
		setUser(null);
		authService.logOut();
	}

	return (
		<AppContext.Provider
			value={{
				isSidebarOpen,
				isEditModeActive,
				toggleSidebar,
				toggleEditMode,
				user,
				isAuth: !!user,
				login,
				logOut,
				...memoized.current,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

AppContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AppContextProvider;
