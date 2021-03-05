import { Avatar } from '@material-ui/core';
import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../features/userSlice';
import './Message.css';

const Message = forwardRef(
	({ contents: { timestamp, displayName, email, message, photo } }, ref) => {
		const user = useSelector(selectUser);

		return (
			<div
				ref={ref}
				className={`message ${user.email === email && 'message__sender'}`}
			>
				<Avatar className='message__photo' src={photo} />
				<p>
					<span className='message__displayName'>{displayName}</span>:{' '}
					<span className='message__messageText'>{message}</span>
				</p>
				<small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
			</div>
		);
	}
);

export default Message;
