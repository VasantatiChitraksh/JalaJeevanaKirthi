import express from 'express';
import { createServer } from 'http';
const app = express();
import cors from 'cors';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { UserRouter } from './routes/user.js';

app.use(express.json())
app.use(cors());
app.use('/auth', UserRouter)

mongoose.connect('mongodb://localhost:27017/authentication') .then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));



const server = createServer(app);

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
    console.log('server running at 3001');
})