function Spinner() {
	return (
		<div className='overlay flex flex-ai-c flex-jc-c'>
			<div className='lds-ring'>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}

export default Spinner;
