import { useEffect, useState } from 'react';
import './ChatList.css';
import MessageList from '../MessageList/MessageList';

let ChatList = () => {

 const [chatList, setChatList] = useState([]);

 const [filteredChatList, setfilteredChatList] = useState([]);

 const [showMessageScreen, setShowMessageScreen] = useState(false);

 const [currentChat, setCurrentChat] = useState({});

 let getChatList = () => {
	fetch('https://my-json-server.typicode.com/codebuds-fk/chat/chats').then((res) => {
		return res.json();
	}).then((res) => {
		console.log(res);
		if(res) {
			setChatList(res);
			setfilteredChatList([...res]);
			console.log(chatList);
		}
	})
	return;
 }

 let showChatPage = (chat) => {
	console.log(chat);
	setShowMessageScreen(true);
	setCurrentChat(chat);
 }

 let getLatestMessage = (messageList , timestamp) => {
	for(let message of messageList) {
		if(message.timestamp === timestamp) {
			return message.message;
		}
	}
 }

 let filterChats = (value) => {
	const filteredcChatList = chatList.filter((val) => {
		return (val.orderId.includes(value) && val.title.includes(value))
	})
	setfilteredChatList([...filteredcChatList]);
 }

  useEffect(() => {
	getChatList();
  }, [])


  return (
    <div className="ChatList flex">
		<div className='chats flex50'>
			<div className='filterInput'>
				<input placeholder='Filter By Title/ Order Id' type='text' onKeyDown={(e) => filterChats(e.target.value)} />
			</div>
			<div>
				{
					filteredChatList.map((chat) => 
						<div className='chatList-list' onClick={() => showChatPage(chat)} key={chat.id}>
							<div className='flex'>
								<div className='p8'>
									<img className='chat-image' src={chat.imageURL} />
								</div>
								<div>
									<div className='primary-text'>{chat.title}</div>
									<div className='primary-text'>Order {chat.orderId}</div>
									<div className='secondary-text'> {getLatestMessage(chat.messageList, chat.latestMessageTimestamp)}</div>
								</div>
							</div>
						</div>
					)
				}
			</div>
		</div>
		{
			showMessageScreen && 
			<>
				<div className='messages flex50'>
					<MessageList currentChat={currentChat} />
				</div>
			</>
		}
    </div>
  );
}

export default ChatList;