import React from 'react';

const Footer: React.FC = () => {
	return (
		<footer className='bg-gray-900 text-white py-4  h-16 w-full mt-auto'>
			<div className='max-w-7xl mx-auto px-6 flex justify-between items-center'>
				<div className='flex items-center space-x-2'>
					<div className='w-8 h-8 bg-green-500 rounded-full'></div>
					<span className='font-bold'>Brilliant</span>
				</div>
				<div className='flex items-center space-x-2'>
					<span>curated by</span>
					<span className='font-bold'>Mobbin</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
