import React from 'react';
import { Button } from '../ui/button';
import { FcGoogle } from 'react-icons/fc';
import { loginWithGoogle } from '@/app/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/app/store';

const LoginProviders: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await dispatch(loginWithGoogle()).unwrap();
      navigate('/dashboard');
    }
    catch {
      console.error('Error logging in with Google:', error);
    }
  }

  return (
    <>
      <p className='text-xl font-semibold text-center mb-1'>
        Create a free account to discover your personalized learning path
      </p>
      <div className='grid grid-cols-1 gap-1'>
        <Button
          variant='outline'
          className='w-full flex items-center justify-center gap-2'
          onClick={handleGoogleLogin}
        >
          <FcGoogle className='h-5 w-5' />
        </Button>
      </div>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t border-gray-200' />
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='px-2 bg-white text-gray-500'>or</span>
        </div>
      </div>
    </>
  );
};

export default LoginProviders;
