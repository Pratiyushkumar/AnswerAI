import React from 'react';
import { Button } from '@/components/ui/button';
import HeroSection from '@/components/heroSection/HeroSection';
import Footer from '@/components/footer/Footer';
import { Link } from 'react-router-dom';
import textImage from '../../assets/text.jpg';
import appOfTheDay from '../../assets/appOfTheDay.jpg';
import bestApp from '../../assets/bestApp.jpg';
import trustPilot from '../../assets/trustPilot.jpg';

const Home: React.FC = () => {
	return (
		<div className='flex flex-col h-screen'>
			<main className='bg-white max-w-screen-xl w-full mx-auto mb-6 flex-grow'>
				{/* Navigation */}
				<nav className='flex justify-between items-center px-6 py-4 lg:px-12'>
					<Link to='/'>
						<h3 className='font-semibold text-lg'>Brilliant</h3>
					</Link>
					<Button
						variant='outline'
						size='lg'
						className='rounded-full px-6'
						asChild
					>
						<Link to='/login'>Log in</Link>
					</Button>
				</nav>
				<HeroSection />
			</main>
			<div className='bg-gray-100 py-14 space-y-6 px-4'>
				<h2 className='text-center font-semibold text-lg '>
					Join over 10 million people learning on Brilliant
				</h2>
				<div className='max-w-7xl mx-auto flex flex-wrap sm:flex-row flex-col md:justify-between md:items-center divide-x gap-4'>
					<img src={textImage} alt='' />

					<div>
						<div className='flex items-center space-x-2'>
							{'★★★★★'.split('').map((star, i) => (
								<span key={i} className='text-yellow-400'>
									{star}
								</span>
							))}
						</div>
						<p className='text-gray-600'>Over 50,000 5-star reviews on</p>
					</div>
					<div>
						<img src={trustPilot} alt='' />
					</div>
					<div className='flex justify-between items-center'>
						<img src={appOfTheDay} alt='App of The day' />
						<img src={bestApp} alt='App of The day' />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Home;
