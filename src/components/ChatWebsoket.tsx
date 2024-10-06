"use client";
import { useEffect, useState } from "react";
import scss from "./ChatWebSocket.module.scss";
import ChatLists from "./ChatList/ChatList";

interface IChatWebSocket {
 username: string;
 photo: string;
 message: string;
}

const ChatWebSocket = () => {
 const [messages, setMessages] = useState<IChatWebSocket[]>([]);
 const [socket, setSocket] = useState<WebSocket | null>()
 const [inputValue, setInputValue] = useState('')


 const initialWebSocket = () => {
  const ws = new WebSocket("wss://api-v2.elchocrud.pro");
  ws.onopen = () => {
   console.log("WebSocket opened");
  };
  ws.onmessage = (event) => {
   setMessages(JSON.parse(event.data));
  };
  ws.onerror = (error) => {
   console.log(error);
  };
  ws.onclose = () => {
   console.log("WebSocket closed");
  };
  setSocket(ws)
 };


 const sendMessage = () => {
    if(!inputValue) return
    const messageData = {
      event: "message",
      username: "Asanbekov Myrzazhan",
      photo:
        "https://api-blog.rdstation.com/wp-content/uploads/2024/02/thestocks-imagem.jpg",
      message: inputValue,
    };

    socket?.send(JSON.stringify(messageData));
    setInputValue('')
  
    socket?.send(JSON.stringify(messageData));
   };
 useEffect(() => {
  initialWebSocket();
 }, []);

 return (
    <section className={scss.ChatWebSocket}>
    <div className="container">
      <div className={scss.ChatWebSocketContent}>
        <ChatLists />
        <div className={scss.content}>
          <h1>Growth Hungry 🔥</h1>
          <div className={scss.sendingMess}>
            <input value={inputValue} type="text" onChange={(e) => setInputValue(e.target.value)}/>
            <button onClick={sendMessage}>send</button>
          </div>
          <div className={scss.messContent}>
            {messages.map((item, index) => (
                  <>

                  <div key={index} className={scss.message} style={{marginLeft: item.username === "Asanbekov Myrzazhan" ? 'auto' : 0}}>
                  <img src={item.photo} alt="avatar" />
                  <div className={scss.messageContent}>
                    <h3>{item.username}</h3>
                    <p>{item.message}</p>
                  </div>
                </div>
                  </>
                
              ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);
};


export default ChatWebSocket;
