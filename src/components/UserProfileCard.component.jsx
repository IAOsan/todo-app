import { useState } from 'react';
import Avatar from './common/Avatar.component';
import Icon from './common/Icon.component';
import Button from './common/Button.component';
import { useAppContext } from '../context/App.context';
import { LogoutIcon } from '../icons';
import { getClassName, accessibleOnClick, setTestid } from '../utils';

function UserProfileCard() {
	const [isExpanded, setIsExpanded] = useState(false);
	const { user, logOut } = useAppContext();

	return (
		<article
			{...setTestid('profile')}
			{...accessibleOnClick(() =>
				setIsExpanded((prevState) => !prevState)
			)}
			className={getClassName('account', { expanded: isExpanded })}
		>
			<div className='flex flex-ai-c mb-12'>
				<Avatar userName={user.username} />
				<div>
					<p className='h5 lineheight-sm'>
						<b>{user.username}</b>
					</p>
					<p className='color-light-800 lineheight-sm'>
						{user.email}
					</p>
				</div>
			</div>
			<Button
				{...setTestid('profile-signout')}
				onClick={logOut}
				toggle
				block
				className='text-left'
				type='button'
			>
				<Icon inline className='mr-16'>
					<LogoutIcon />
				</Icon>
				Sign out
			</Button>
		</article>
	);
}

export default UserProfileCard;
