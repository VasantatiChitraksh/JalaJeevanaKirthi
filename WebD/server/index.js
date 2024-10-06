import express from('express');
const http = require('http');
const app = express();
const cors = require('cors');
const { Server } = require('socket.io');



app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: { 
        origin: "http://localhost:5173", 
        methods: ["GET", "POST"]
    },
});

let rooms = {}

io.on('connection', (socket)=>{
    console.log(`User connected with socket id: `, socket.id);

    socket.on('start_chat', ({room})=>{
        if(!rooms[room]){
            rooms[room] = [];
        }
    })

    socket.on("ask_query", ({room, msg})=>{
        if (!rooms[room]) {
            rooms[room] = []; // Initialize room if it doesn't exist
        }
        msg = {...msg, user: true};
        console.log(msg);
        rooms[room].push(msg);

        //should add code here to connnect with chatbot, preferable use ngrox and get response
        let response = {
            msg: "I am a bot",
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
        };
        response = {...response, user:false};
        rooms[room].push(response);

        io.to(room).emit('chat_update', rooms[room]); //emitting the msg list as it updates to the users
    })

    socket.on("disconnect", (room)=>{
        delete rooms[room]
    })
})

server.listen(3001, ()=>{
    console.log('server running');
})