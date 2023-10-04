import './MessageList.css';

function MessageList(props) {

  const currentChat = props.currentChat;

  const messageList = currentChat.messageList;

  return (
    <div className="MessageListBody">
        <div className='messageTitle flex align-center'>
			<div className='p8'><img className='messsage-title-img' src={currentChat.imageURL} /></div>
			<div className='primary-text'>{currentChat.title}</div>
		</div>
		<div className='messageBody'>

				{
					messageList.map((msg) => {
						return (
							<div className={msg.sender === 'BOT' ? 'flex-start' : 'flex-end'}>
								<div className={msg.sender === 'BOT' ? 'bot-message-body' : 'user-message-body'}>
										<div className='message-text primary-text' style={{color: msg.sender === 'BOT' ? 'black' : 'white'}}>
											{msg.message}
										</div>
										<div className='message-time secondary-text' style={{color: msg.sender === 'BOT' ? 'black' : 'white'}}>
											{msg.timestamp}
										</div>
								 </div>	
							</div>
						)
					})
				}

		</div>
		<div className='messageFooter'>

		</div>
    </div>
  );
}

export default MessageList;
