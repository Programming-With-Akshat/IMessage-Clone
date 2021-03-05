import { Avatar } from '@material-ui/core';
import { setChat } from '../../../features/chatSlice';
import { useDispatch } from 'react-redux';
import './SidebarChat.css';
import db from '../../../firebase';
import { useEffect, useState } from 'react';

const SidebarChat = ({ id, chatName }) => {
	const dispatch = useDispatch();
	const [chatInfo, setChatInfo] = useState([]);

	useEffect(() => {
		db.collection('chats')
			.doc(id)
			.collection('messages')
			.orderBy('timestamp', 'desc')
			.onSnapshot((snapshot) =>
				setChatInfo(snapshot.docs.map((doc) => doc.data()))
			);
	}, [id]);

	return (
		<div
			onClick={() =>
				dispatch(
					setChat({
						chatId: id,
						chatName: chatName
					})
				)
			}
			className='sidebarChat'
		>
			<Avatar src={chatInfo[0]?.photo} />
			<div className='sidebarChat__info'>
				<h3>{chatName}</h3>
				<p>{chatInfo[0]?.message}</p>
			</div>
		</div>
	);
};

export default SidebarChat;
