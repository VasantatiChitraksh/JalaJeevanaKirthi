import { useEffect, useState, useRef } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import io from 'socket.io-client';
import './chat.css';

const socket = io.connect("https://ug2-team3-se-webd-1.onrender.com");

function Chat() {
    const [messages, setMessages] = useState([]);
    const [query, setQuery] = useState('');
    const [room, setRoom] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        socket.on('connect', () => {
            const newRoom = socket.id;
            setRoom(newRoom);
            socket.emit('start_chat', { room: newRoom });
        });

        socket.on('chat_update', (newMessages) => {
            console.log(newMessages)
            setMessages(newMessages);
        });

        return () => {
            socket.off('chat_update');
            socket.off('connect');
        };
    }, [messages]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const sendMessage = () => {
        if (query !== "") {
            const msgData = {
                msg: query,
                time: new Date().toLocaleTimeString(),
            };

            socket.emit("ask_query", { room, msg: msgData });
            setQuery("");
        }
    };

    return (
        <>
            <div className='chatbox'>
                <div className="header">AI Assistant</div>
                <div className="body">
                    {messages.map((message, index) => (
                        <div 
                            key={index} 
                            className={`message ${message.user ? 'user' : 'bot'}`}
                        >
                            <div>{message.msg}</div>
                            <div>
                                <span>{message.time}</span>
                                <span className='time-author'> {message.user ? "You" : "Bot"}</span>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef}/>
                </div>
                <div className="footer">
                    <input
                        className='msg-box'
                        type="text"
                        placeholder="Enter query..."
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <button className="send-msg" onClick={sendMessage}>
                        <FaPaperPlane color="white" />
                    </button>
                </div>
            </div>
        </>
    );
}

export default Chat;
