import './App.css';
import IMessage from './components/IMessage/IMessage';
import { login, logout, selectUser } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/Login/Login';
import { useEffect } from 'react';
import { auth } from './firebase';

const App = () => {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				dispatch(
					login({
						uid: authUser.uid,
						photo: authUser.photoURL,
						email: authUser.email,
						displayName: authUser.displayName
					})
				);
			} else {
				dispatch(logout());
			}
		});
	}, []);

	return <div className='app'>{user ? <IMessage /> : <Login />}</div>;
};

export default App;
