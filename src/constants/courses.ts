import llmWork from '../assets/llmWork.jpg';
import design from '../assets/design.jpg';
import probability from '../assets/probability.jpg';
import modeling from '../assets/modeling.jpg';
import vectors from '../assets/vectors.jpg';
import python from '../assets/python.jpg';
import homeSecurity from '../assets/homeSecurity.jpg';
import networkAnalysis from '../assets/NetworkAnalysis.jpg';
import music from '../assets/music.jpg';
import ml from '../assets/ML.jpg';

export interface NewCourse {
	title: string;
	image: string;
	category: string;
	isNew: boolean;
}

export const newCourses: NewCourse[] = [
	{
		title: 'How LLMs Work',
		image: llmWork,
		category: 'Computer Science',
		isNew: true,
	},
	{
		title: 'Designing Programs',
		image: design,
		category: 'Computer Science',
		isNew: true,
	},
	{
		title: 'Introduction to Probability',
		image: probability,
		category: 'Math',
		isNew: true,
	},
	{
		title: 'Modeling with Multiple Variables',
		image: modeling,
		category: 'Math',
		isNew: true,
	},
	{
		title: 'Vectors',
		image: vectors,
		category: 'Math',
		isNew: true,
	},
	{
		title: 'Applied Python',
		image: python,
		category: 'Computer Science',
		isNew: true,
	},
	{
		title: 'Home Security',
		image: homeSecurity,
		category: 'Science',
		isNew: true,
	},
	{
		title: 'Network Analysis',
		image: networkAnalysis,
		category: 'Data',
		isNew: true,
	},
	{
		title: 'Music Analytics',
		image: music,
		category: 'Data',
		isNew: true,
	},
	{
		title: 'Machine Learning Basics',
		image: ml,
		category: 'Computer Science',
		isNew: true,
	},
];
