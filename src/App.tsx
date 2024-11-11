import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/landingPage';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import Dashboard from './pages/dashboard';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/login',
		element: <LoginPage />,
	},
	{
		path: '/signup',
		element: <SignupPage />,
	},
	{
		path: '/dashboard',
		element: (
			<ProtectedRoute>
				<Dashboard />
			</ProtectedRoute>
		),
	},
]);

const App = () => {
	return (
		<RouterProvider router={router} fallbackElement={<p> Loading...</p>} />
	);
};

export default App;
