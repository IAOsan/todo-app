import { createContext, useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';

export const ListsContext = createContext();
export const useListsContext = () => {
	const context = useContext(ListsContext);

	if (!context)
		throw new Error(
			'"useListsContext" must be called in "ListsContextProvider"'
		);

	return context;
};

function ListsContextProvider({ children }) {
	const [lists, setLists] = useState([
		{
			label: 'Today',
			theme: 'primary',
			icon: 'sun',
			displayDate: true,
		},
		{
			label: 'Important',
			theme: 'warning',
			icon: 'star',
			displayIcon: true,
		},
		{
			label: 'All',
			theme: 'secondary',
			icon: 'infinite',
			displayIcon: true,
		},
	]);
	const [activeList, setActiveList] = useState({});
	const memoized = useRef({
		selectList,
	});

	function selectList(label) {
		setActiveList(lists.find((o) => o.label === label));
	}

	return (
		<ListsContext.Provider
			value={{
				activeList,
				lists,
				...memoized.current,
			}}
		>
			{children}
		</ListsContext.Provider>
	);
}

ListsContextProvider.propTypes = {
	children: PropTypes.any.isRequired,
};

export default ListsContextProvider;
