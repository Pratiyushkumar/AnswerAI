/* eslint-disable @typescript-eslint/no-explicit-any */
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {auth} from '../../../config/firebase.ts';
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
	FacebookAuthProvider,
	signOut,
	updateProfile,
	getAuth,
	onAuthStateChanged,
} from 'firebase/auth';

interface AuthState {
	user: any | null;
	loading: boolean;
	error: string | null;
}

const initialState: AuthState = {
	user: null,
	loading: true,
	error: null,
};

export const loginWithEmail = createAsyncThunk(
	'auth/signinWithEmail',
	async ({email, password}: {email: string; password: string}) => {
		const result = await signInWithEmailAndPassword(auth, email, password);
		return result.user;
	},
);

export const signupWithEmail = createAsyncThunk(
	'auth/signupWithEmail',
	async ({
		email,
		password,
		firstName,
		lastName,
	}: {
		email: string;
		password: string;
		firstName: string;
		lastName: string;
	}) => {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password,
		);

		// Update profile using the separate updateProfile function
		if (userCredential.user) {
			await updateProfile(userCredential.user, {
				displayName: `${firstName} ${lastName}`,
			});
		}

		return userCredential.user;
	},
);

export const loginWithGoogle = createAsyncThunk(
	'auth/signinWithGoogle',
	async () => {
		const provider = new GoogleAuthProvider();
		const result = await signInWithPopup(auth, provider);
		return result.user;
	},
);

export const loginWithFacebook = createAsyncThunk(
	'auth/signinWithFacebook',
	async () => {
		const provider = new FacebookAuthProvider();
		const result = await signInWithPopup(auth, provider);
		return result.user;
	},
);

export const logout = createAsyncThunk('auth/logout', async () => {
	await signOut(auth);
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<any | null>) => {
			state.user = action.payload;
			state.loading = false;
		},
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(
				(action) => action.type.endsWith('/pending'),
				(state) => {
					state.loading = true;
					state.error = null;
				},
			)
			.addMatcher(
				(action) => action.type.endsWith('/fulfilled'),
				(state, action: PayloadAction<any | null>) => {
					state.loading = false;
					state.user = action.payload;
					state.error = null;
				},
			)
			.addMatcher(
				(action) => action.type.endsWith('/rejected'),
				(state, action) => {
					state.loading = false;
					state.error =
						(action as unknown as {error: {message: string}}).error.message ||
						'An error occurred';
				},
			);
	},
});

export const checkUserLoggedIn = () => async (dispatch: any) => {
	const auth = getAuth();

	onAuthStateChanged(auth, (user) => {
		if (user) {
			dispatch(authSlice.actions.setUser(user)); // User is logged in
		} else {
			dispatch(authSlice.actions.setUser(null)); // No user is logged in
		}
	});
};

export const {setUser, clearError} = authSlice.actions;
export default authSlice.reducer;
