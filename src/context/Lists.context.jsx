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
			label: 'today',
			theme: 'primary',
			icon: 'sun',
			displayDate: true,
		},
		{
			label: 'important',
			theme: 'warning',
			icon: 'star',
			displayIcon: true,
		},
		{
			label: 'all',
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
		const selectedList = lists.find(
			(o) => o.label.toLowerCase() === label.toLowerCase()
		);
		setActiveList((prevState) => selectedList || prevState);
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
	children: PropTypes.node.isRequired,
};

export default ListsContextProvider;
