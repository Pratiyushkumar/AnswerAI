import React from 'react';
import { Button } from '../ui/button';
import heroImage from '../../assets/image.png';
import { Link } from 'react-router-dom';

const subjects = [
	{ name: 'Math', id: 1, icon: '📐' },
	{ name: 'Data Analysis', id: 2, icon: '📊' },
	{ name: 'Computer Science', id: 3, icon: '💻' },
	{ name: 'Programming & AI', id: 4, icon: '🤖' },
	{ name: 'Science & Engineering', id: 5, icon: '⚡' },
];

const HeroSection: React.FC = () => {
	return (
		<div className='w-full py-9 lg:py-9 lg:px-12'>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-72 items-center'>
				<div className='space-y-8 lg:block flex flex-col justify-center items-center'>
					<h1 className='text-4xl lg:text-6xl font-bold'>
						Learn by <span className='text-blue-500'>doing</span>
					</h1>
					<p className='text-lg text-gray-600 text-center lg:text-left'>
						Guided interactive problem solving that's effective and fun. Master
						concepts in 15 minutes a day.
					</p>
					<Button
						className='rounded-full px-8 py-6 bg-green-500 hover:bg-green-600 text-lg'
						asChild
					>
						<Link to='/signup'>Get started</Link>
					</Button>
				</div>
				<div className='mx-auto'>
					<img src={heroImage} alt='hero Image' />
				</div>
			</div>
			<div className='mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6'>
				{subjects.map((subject) => (
					<div
						key={subject.id}
						className='flex items-center space-x-3 p-4 rounded-lg'
					>
						<span className='text-2xl'>{subject.icon}</span>
						<span className='text-sm font-medium'>{subject.name}</span>
					</div>
				))}
			</div>
			<div></div>
		</div>
	);
};

export default HeroSection;
