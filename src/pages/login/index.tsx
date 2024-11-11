import React, { useState } from 'react';
import Footer from '@/components/footer/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import authImage from '../../assets/authImage.jpg';
import { Link, useNavigate } from 'react-router-dom';
import LoginProviders from '@/components/loginProviders';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { clearError, loginWithEmail } from '@/app/features/auth/authSlice';

interface FormData {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state: RootState) => state.auth);

    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
    });

    const [validationErrors, setValidationErrors] = useState<Partial<FormData>>(
        {},
    );

    const validateForm = (): boolean => {
        const errors: Partial<FormData> = {};

        if (!formData.email || !formData.email.includes('@')) {
            errors.email = 'Valid email is required';
        }

        if (!formData.password) {
            errors.password = 'Password is required';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (error) {
            dispatch(clearError());
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (validationErrors[name as keyof FormData]) {
            setValidationErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const resultAction = await dispatch(
                loginWithEmail({
                    email: formData.email,
                    password: formData.password,
                }),
            );

            if (loginWithEmail.fulfilled.match(resultAction)) {
                navigate('/dashboard');
            }
        } catch (err) {
            console.error('Login failed:', err);
        }
        setFormData({
            email: '',
            password: '',
        });
    };
    return (
        <div className='flex flex-col h-screen overflow-y-hidden'>
            <main className='flex-1 grid md:grid-cols-2 gap-2 px-4 py-8'>
                <div className='hidden md:flex items-center justify-end p-4'>
                    <img
                        src={authImage}
                        alt='authpage Image'
                        className='max-w-full h-auto object-contain'
                    />
                </div>
                <div className='flex flex-col justify-center max-w-md  w-full space-y-1 p-4'>
                    <LoginProviders />

                    {error && (
                        <Alert variant="destructive" className="animate-in fade-in duration-300">
                            <AlertDescription className="flex justify-between items-center">
                                <span>{error}</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => dispatch(clearError())}
                                    className="h-4 w-4 p-0 hover:bg-transparent"
                                >
                                    ×
                                </Button>
                            </AlertDescription>
                        </Alert>
                    )}

                    <form className='space-y-4' onSubmit={handleSubmit}>
                        <div className='space-y-1'>
                            <Input
                                type='email'
                                name='email'
                                placeholder='Email'
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full ${validationErrors.email ? 'border-red-500' : ''}`}
                            />
                            {validationErrors.email && (
                                <p className='text-xs text-red-500'>{validationErrors.email}</p>
                            )}
                        </div>

                        <div className='space-y-1'>
                            <Input
                                type='password'
                                name='password'
                                placeholder='Password'
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full ${validationErrors.password ? 'border-red-500' : ''}`}
                            />
                            {validationErrors.password && (
                                <p className='text-xs text-red-500'>
                                    {validationErrors.password}
                                </p>
                            )}
                        </div>
                        <Button
                            type='submit'
                            className='w-full bg-gray-900 text-white hover:bg-gray-800'
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>

                        <p className='text-xs text-center text-gray-500'>
                            By clicking above, I agree to Brilliant's{' '}
                            <Link to='#' className='underline'>
                                Terms
                            </Link>{' '}
                            and{' '}
                            <Link to='#' className='underline'>
                                Privacy Policy
                            </Link>
                        </p>

                        <div className='text-center mt-3'>
                            <p className='text-sm text-gray-500'>
                                New user?{' '}
                                <Link to='/signup' className='text-gray-900 hover:underline'>
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default LoginPage;
