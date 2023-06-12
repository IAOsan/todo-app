import Avatar from './common/Avatar.component';

function UserProfileCard() {
	const data = {
		username: 'Julio Cortazar',
		email: 'cortazar@mail.com',
	};

	return (
		<article className='account flex flex-ai-c'>
			<Avatar userName={data.username} />
			<div>
				<p className='h5 lineheight-sm'>
					<b>{data.username}</b>
				</p>
				<p className='color-light-800 lineheight-sm'>{data.email}</p>
			</div>
		</article>
	);
}

export default UserProfileCard;
