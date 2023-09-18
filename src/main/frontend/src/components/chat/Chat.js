import React, { useState, useEffect } from 'react';

const Chat = () => {
  const [chat, setChat] = useState('');
  const [chatList, setChatList] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // WebSocket 연결
    const ws = new WebSocket('ws://localhost:3000/ws');

    ws.onopen = () => {
      console.log('WebSocket 연결 성공');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setChatList((prevChatList) => [...prevChatList, message.chat]);
    };

    ws.onclose = () => {
      console.log('WebSocket 연결 종료');
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && chat) {
      const message = {
        chat: chat,
      };
      socket.send(JSON.stringify(message));
      setChat(''); // 입력 필드 초기화
    }
  };

  const handleChange = (event) => {
    setChat(event.target.value);
  };

  return (
    <div>
      <div className="chat-list">
        {chatList.map((message, index) => (
          <div key={index} className="chat-message">
            {message}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input type="text" name="chatInput" onChange={handleChange} value={chat} />
        <button onClick={sendMessage}>메시지 보내기</button>
      </div>
    </div>
  );
};

export default Chat;
