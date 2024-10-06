import { useEffect, useState } from 'react';
import io from 'socket.io-client'

const socket = io.connect('https://localhost:3001')

function chat(){
    const [message, setMessages] = useState([]);

    useEffect(()=>{
        socket.on('chat_update', (newMessages)=>{
            setMessages(newMessages);
        })

        return ()=>{
            socket.off('chat_update');
        }
    });


    return (
        <div>
        
        </div>
    )

}

export default chat;