import React from 'react';
import Footer from '@/components/footer/Footer';
import Navbar from '../../components/navbar';
import HomePage from '../home';
import CoursePage from '../courses';
import { useSearchParams } from 'react-router-dom';

const Dashboard: React.FC = () => {
	const [searchParams] = useSearchParams();
	const activePage = searchParams.get('tab') || 'home';

	return (
		<div className='bg-white min-h-screen'>
			<Navbar activePage={activePage} />

			{
				activePage === 'home' && <HomePage />
			}

			{
				activePage === "courses" && <CoursePage />
			}

			<Footer />
		</div>
	);
};

export default Dashboard;
