import { IconButton } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { selectUser } from '../../features/userSlice';
import { selectChatName, selectChatId } from '../../features/chatSlice';
import { useSelector } from 'react-redux';
import Message from './Message/Message';
import db from '../../firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import './Chat.css';

const Chat = () => {
	const user = useSelector(selectUser);
	const [input, setInput] = useState('');
	const chatName = useSelector(selectChatName);
	const chatId = useSelector(selectChatId);
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		if (chatId) {
			db.collection('chats')
				.doc(chatId)
				.collection('messages')
				.orderBy('timestamp', 'desc')
				.onSnapshot((snapshot) =>
					setMessages(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							data: doc.data()
						}))
					)
				);
		}
	}, [chatId]);

	const sendMessage = (e) => {
		e.preventDefault();

		db.collection('chats').doc(chatId).collection('messages').add({
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			message: input,
			uid: user.uid,
			photo: user.photo,
			email: user.email,
			displayName: user.displayName
		});

		setInput('');
	};

	return (
		<div className='chat'>
			<div className='chat__header'>
				<h4>
					To: <span className='chat__name'>{chatName}</span>
				</h4>
				<strong>Details</strong>
			</div>

			<div className='chat__messages'>
				<FlipMove>
					{messages.map(({ id, data }) => (
						<Message key={id} contents={data} />
					))}
				</FlipMove>
			</div>

			<div className='chat__input'>
				<form>
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder='Send a message...'
						type='text'
					/>
					<IconButton
						type='submit'
						onClick={sendMessage}
						disabled={!input}
						className='chat__sendIcon'
					>
						<i class='fas fa-paper-plane'></i>
					</IconButton>
				</form>
			</div>
		</div>
	);
};

export default Chat;
