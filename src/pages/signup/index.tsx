import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Footer from '@/components/footer/Footer';
import authImage from '../../assets/authImage.jpg';
import LoginProviders from '@/components/loginProviders';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';
import { clearError, signupWithEmail } from '@/app/features/auth/authSlice';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface FormData {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	age: string;
}

const SignupPage: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { loading, error } = useAppSelector((state: RootState) => state.auth);
	const [formData, setFormData] = useState<FormData>({
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		age: '',
	});
	const [validationErrors, setValidationErrors] = useState<Partial<FormData>>(
		{},
	);

	useEffect(() => {
		return () => {
			if (error) {
				dispatch(clearError());
			}
		};
	}, [dispatch, error]);

	const validateForm = (): boolean => {
		const errors: Partial<FormData> = {};

		if (!formData.email || !formData.email.includes('@')) {
			errors.email = 'Valid email is required';
		}

		if (!formData.password || formData.password.length < 6) {
			errors.password = 'Password must be at least 6 characters';
		}

		if (!formData.firstName) {
			errors.firstName = 'First name is required';
		}

		if (!formData.lastName) {
			errors.lastName = 'Last name is required';
		}

		const age = parseInt(formData.age);
		if (!formData.age || isNaN(age) || age < 13 || age > 120) {
			errors.age = 'Valid age between 13 and 120 is required';
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
				signupWithEmail({
					email: formData.email,
					password: formData.password,
					firstName: formData.firstName,
					lastName: formData.lastName,
				}),
			);

			if (signupWithEmail.fulfilled.match(resultAction)) {
				navigate('/dashboard');
			}
		} catch (err) {
			console.error('Signup failed:', err);
		}

		setFormData({
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			age: '',
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
					<form className='space-y-2' onSubmit={handleSubmit}>
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
						<div className='flex flex-1'>
							<div className='space-y-1 w-full'>
								<Input
									type='text'
									name='firstName'
									placeholder='First Name'
									value={formData.firstName}
									onChange={handleChange}
									className={validationErrors.firstName ? 'border-red-500' : ''}
								/>
								{validationErrors.firstName && (
									<p className='text-xs text-red-500'>
										{validationErrors.firstName}
									</p>
								)}
							</div>

							<div className='space-y-1 w-full'>
								<Input
									type='text'
									name='lastName'
									placeholder='Last Name'
									value={formData.lastName}
									onChange={handleChange}
									className={validationErrors.lastName ? 'border-red-500' : ''}
								/>
								{validationErrors.lastName && (
									<p className='text-xs text-red-500'>
										{validationErrors.lastName}
									</p>
								)}
							</div>
						</div>
						<div className='space-y-1'>
							<Input
								type='number'
								name='age'
								placeholder='Age'
								value={formData.age}
								onChange={handleChange}
								className={`w-full ${validationErrors.age ? 'border-red-500' : ''}`}
							/>
							{validationErrors.age && (
								<p className='text-xs text-red-500'>{validationErrors.age}</p>
							)}
						</div>
						<Button
							type='submit'
							className='w-full bg-gray-900 text-white hover:bg-gray-800'
							disabled={loading}
						>
							{loading ? 'Signing up...' : 'Sign up'}
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

						<div className='text-center mt-28'>
							<p className='text-sm text-gray-500'>
								Existing user?{' '}
								<Link to='/login' className='text-gray-900 hover:underline'>
									Log in
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

export default SignupPage;
