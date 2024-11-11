import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { NewCourse, newCourses } from '@/constants/courses';
import { IoIosSearch } from 'react-icons/io';

interface FilteredCourse extends NewCourse {
	isShown: boolean;
}
const categories = [
	'New courses',
	'Math',
	'Data',
	'Computer Science',
	'Science',
];

const CoursePage: React.FC = () => {
	const [selectedCategory, setSelectedCategory] =
		useState<string>('New courses');
	const [searchTerm, setSearchTerm] = useState<string>('');

	const [filteredCourses, setFilteredCourses] = useState<FilteredCourse[]>(
		newCourses.map((course) => ({ ...course, isShown: true })),
	);
	const [noCoursesFound, setNoCoursesFound] = useState<boolean>(false);

	const debouncedSearch = useRef<ReturnType<typeof setTimeout>>();

	const handleCategoryChange = (category: string) => {
		setSelectedCategory(category);
		setFilteredCourses(
			newCourses.map((course) => ({
				...course,
				isShown:
					category === 'New courses'
						? course.isNew
						: course.category === category,
			})),
		);
	};

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = event.target.value.toLowerCase();
		setSearchTerm(searchTerm);

		if (debouncedSearch.current) {
			clearTimeout(debouncedSearch.current);
		}

		debouncedSearch.current = setTimeout(() => {
			const filteredCourses = newCourses.map((course) => ({
				...course,
				isShown: course.title.toLowerCase().includes(searchTerm),
			}));
			setFilteredCourses(filteredCourses);
			setNoCoursesFound(filteredCourses.every((course) => !course.isShown));
		}, 300);
	};

	useEffect(() => {
		return () => {
			if (debouncedSearch.current) {
				clearTimeout(debouncedSearch.current);
			}
		};
	}, []);

	return (
		<div className='p-6 max-w-7xl min-h-[calc(100vh-125px)] mx-auto'>
			<h1 className='text-2xl font-bold mb-6'>Browse all 70+ courses</h1>
			<div className='relative mb-6'>
				<IoIosSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
				<Input
					type='text'
					placeholder='Search'
					className='w-full pl-10 py-2 rounded-full border-gray-200'
					value={searchTerm}
					onChange={handleSearch}
				/>
			</div>

			<div className='flex flex-wrap gap-3 mb-8'>
				{categories.map((category) => (
					<Button
						key={category}
						variant={selectedCategory === category ? 'default' : 'outline'}
						onClick={() => handleCategoryChange(category)}
						className={`rounded-full ${selectedCategory === category ? 'bg-black text-white hover:bg-gray-800' : 'bg-white'}`}
					>
						{category}
					</Button>
				))}
			</div>

			<div className='mb-8'>
				<h2 className='text-xl font-bold mb-8'>{selectedCategory}</h2>
				{noCoursesFound ? (
					<div className='text-center text-gray-500 mt-8'>
						No courses found for the current search term.
					</div>
				) : (
					<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
						{filteredCourses
							.filter((course) => course.isShown)
							.map((course, index) => (
								<div key={index}>
									<Card className='relative group cursor-pointer hover:shadow-lg transition-shadow'>
										<CardContent className='p-4'>
											{course.isNew && (
												<div className='absolute top-3 right-3'>
													<span className='bg-green-500 text-white text-xs px-2 py-1 rounded'>
														NEW
													</span>
												</div>
											)}
											<div className='aspect-square mb-4 relative'>
												<img
													src={course.image}
													alt={course.title}
													className='w-full h-full object-cover rounded-lg'
												/>
											</div>
										</CardContent>
									</Card>
									<h3 className='text-sm font-medium text-center'>
										{course.title}
									</h3>
								</div>
							))}
					</div>
				)}
			</div>
		</div>
	);
};

export default CoursePage;
