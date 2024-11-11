import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { BsLightning } from 'react-icons/bs';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useAppDispatch } from '@/app/hooks';
import { logout } from '@/app/features/auth/authSlice';

interface ComponentProps {
    activePage: string;
}

const Navbar: React.FC<ComponentProps> = ({ activePage }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        try {
            await dispatch(logout());
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };


    return (
        <nav className='border-b border-gray-200 bg-white px-4 py-3'>
            <div className='mx-auto max-w-7xl'>
                <div className='flex items-center justify-between'>
                    {/* left part */}
                    <div className='flex items-center space-x-8'>
                        <Link to='/dashboard' className='flex-shrink-0'>
                            <span className='text-xl font-bold'>Brilliant</span>
                        </Link>
                        <Link
                            to='/dashboard?tab=home'
                            className={`text-gray-700 hover:text-gray-900 font-medium ${activePage === "home" ? "border-b-2 border-black" : ""}`}
                        >
                            Home
                        </Link>
                        <Link
                            to='/dashboard?tab=courses'
                            className={`text-gray-700 hover:text-gray-900 font-medium ${activePage === "courses" ? "border-b-2 border-black" : ""}`}
                        >
                            Courses
                        </Link>
                    </div>
                    {/* center part */}
                    <div className='hidden md:flex flex-1 max-w-md mx-8'>
                        <div className='relative w-full'>
                            <Input
                                type='search'
                                placeholder='Search...'
                                className='w-full pl-10'
                            />
                            <FaMagnifyingGlass className='absolute left-3 top-2.5 h-4 w-4 text-gray-400' />
                        </div>
                    </div>
                    {/* right part */}
                    <div className='flex items-center space-x-4'>
                        <Button
                            variant='outline'
                            className='hidden sm:flex !bg-transparent rounded-full px-6 border-[#2d7c2b] !text-[#2d7c2b]'
                        >
                            Gift premium
                        </Button>

                        <div className='flex items-center 0 px-3 py-1 rounded-full'>
                            <span className='text-sm font-medium'>0</span>
                            <BsLightning />
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='ghost' size='icon' className='h-5 w-5' >
                                    <GiHamburgerMenu />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end' className='w-48'>
                                <DropdownMenuItem>Account Settings</DropdownMenuItem>
                                <DropdownMenuItem>Help Center</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
