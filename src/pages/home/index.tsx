import React from 'react';
import { useAppSelector } from '@/app/hooks';

import { BsLightningCharge } from 'react-icons/bs';
import { IoIosLock } from "react-icons/io";
import { Button } from '@/components/ui/button';
import scientificThinking from "../../assets/scientificThinking.jpg";
import logic from "../../assets/logic.jpg";
import foundational from "../../assets/foundational.jpg";
import programming from "../../assets/programming.jpg";
import { Card, CardContent } from '@/components/ui/card';

const HomePage: React.FC = () => {
    const state = useAppSelector((state) => state.auth.user);
    const name = state.displayName.split(' ')[0];

    const days = ['T', 'W', 'Th', 'F', 'S'];

    const recommendedCourses = [
        {
            title: 'Logic',
            icon: logic,
            subtitle: null,
        },
        {
            title: 'Computer Science Fundamentals',
            icon: foundational,
            subtitle: 'CS & PROGRAMMING • LEVEL 2',
        },
        {
            title: 'Solving Equations',
            icon: programming,
            subtitle: 'FOUNDATIONAL MATH • LEVEL 1',
        },
    ];

    return (
        <div className='p-6 max-w-6xl mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-4'>
                    <h1 className='text-xl font-semibold mb-6'>Welcome, {name}</h1>
                    <Card className='p-4'>
                        <div className='flex items-center gap-2 mb-4'>
                            <span className='text-3xl font-bold'>1</span>
                            <BsLightningCharge className='w-7 h-7 text-gray-300' />
                        </div>
                        <p className='text-sm mb-4'>
                            Solve <span className='font-medium'>3 problems</span> to continue
                            your streak
                        </p>

                        <div className='flex items-center space-x-7'>
                            {days.map((day, index) => (
                                <div key={index} className='flex flex-col items-center justify-center'>
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center ${index === 0 ? 'bg-yellow-400' : 'bg-gray-200'}`}
                                    >
                                        <BsLightningCharge />
                                    </div>
                                    <span className="text-sm mt-1 font-semibold">{day}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-orange-100 p-2 rounded-lg">
                                <IoIosLock className="w-5 h-5 text-orange-500" />
                            </div>
                            <div>
                                <div className="font-medium">UNLOCK LEAGUES</div>
                                <div className="text-sm text-gray-500">70 of 175 XP</div>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="space-y-6">
                    <p className='mb-6'>Jump back in</p>

                    <Card>
                        <CardContent className="p-0">
                            <img src={scientificThinking} alt="scientificThinking" />
                            <div className="p-6 text-center">
                                <div className="text-sm text-yellow-600 font-medium mb-1">SCIENCE • LEVEL 1</div>
                                <h2 className="text-xl font-semibold mb-4">Scientific Thinking</h2>
                                <Button className="w-full bg-black text-white hover:bg-gray-800">
                                    Continue path
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <div>
                        <h2 className="text-lg font-semibold mb-4">Recommended for you</h2>
                        <div className="flex space-x-8 items-center">
                            {recommendedCourses.map((course, index) => (
                                <Card key={index} className="p-4 w-[50%] min-h-56 hover:shadow-lg transition-shadow cursor-pointer">
                                    <div className="text-center">
                                        <img src={course.icon} className='mx-auto' />
                                        <div className="font-medium text-sm">{course.title}</div>
                                        {course.subtitle && (
                                            <div className="text-xs text-gray-500 mt-1">{course.subtitle}</div>
                                        )}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
