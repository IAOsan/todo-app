import { createContext, useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';

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
	const memoized = useRef({
		initialList: 'Today',
	});

	function handleSidebarToggle() {
		setIsSidebarOpen((prevState) => !prevState);
	}

	function handleEditModeToggle() {
		setIsEditModeActive((prevState) => !prevState);
	}

	return (
		<AppContext.Provider
			value={{
				isSidebarOpen,
				isEditModeActive,
				handleSidebarToggle,
				handleEditModeToggle,
				...memoized.current,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

AppContextProvider.propTypes = {
	children: PropTypes.any.isRequired,
};

export default AppContextProvider;
