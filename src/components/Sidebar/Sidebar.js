import { IconButton } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import db, { auth } from '../../firebase';
import './Sidebar.css';
import SidebarChat from './SidebarChat/SidebarChat';

const Sidebar = () => {
	const user = useSelector(selectUser);
	const [chats, setChats] = useState([]);

	useEffect(() => {
		db.collection('chats').onSnapshot((snapshot) =>
			setChats(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data()
				}))
			)
		);
	}, []);

	const addChat = () => {
		const chatName = prompt('Enter the chat name');

		if (chatName) {
			db.collection('chats').add({
				chatName: chatName
			});
		}
	};

	return (
		<div className='sidebar'>
			<div className='sidebar__header'>
				<Avatar
					style={{ cursor: 'pointer' }}
					src={user.photo}
					onClick={() => auth.signOut()}
				/>

				<div className='sidebar__input'>
					<i class='fas fa-search'></i>
					<input type='text' placeholder='Search' />
				</div>

				<IconButton onClick={addChat}>
					<i class='fas fa-plus'></i>
				</IconButton>
			</div>

			<div className='sidebar__chats'>
				{chats.map(({ id, data: { chatName } }) => (
					<SidebarChat key={id} id={id} chatName={chatName} />
				))}
			</div>
		</div>
	);
};

export default Sidebar;
