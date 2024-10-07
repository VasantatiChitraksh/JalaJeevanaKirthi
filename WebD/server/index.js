import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { UserRouter } from './routes/user.js';
import cookieParser from 'cookie-parser';
import axios from 'axios';

const app = express();

app.use(express.json());
app.use(cors());

app.use(cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allow credentials (cookies, tokens)
}));

app.use(cookieParser())

app.use('/auth', UserRouter)

mongoose.connect('mongodb+srv://jjkweb:ug2team3@cluster0.b3naz.mongodb.net/authtication') .then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));




const server = createServer(app);

const io = new Server(server, {
    cors: { 
        origin: "http://localhost:5173", 
        methods: ["GET", "POST"],
        credentials: true
    },
});

let rooms = {};

io.on('connection', (socket) => {
    console.log(`User connected with socket id: ${socket.id}`);

    socket.on('start_chat', ({ room }) => {
        if (!rooms[room]) {
            rooms[room] = [];
        }
        socket.join(room); // Join the specified room
    });

    socket.on("ask_query", async ({ room, msg }) => {
        if (!rooms[room]) {
            rooms[room] = []; // Initialize room if it doesn't exist
        }
        msg = { ...msg, user: true };
        console.log(msg);
        rooms[room].push(msg);

        try {
            const response = await axios.post('https://762a-14-139-176-131.ngrok-free.app', { 
                query: msg.msg 
            });
        
            // Assuming the Flask server returns something like { answer: "bot response" }
            let botResponse = {
                msg: response.data.answer,
                time: new Date().toLocaleTimeString(), // Simplified time format
                user: false
            };
        
            rooms[room].push(botResponse); // Push the bot response

            io.to(room).emit('chat_update', rooms[room]); // Emit the updated message list to the users
        } catch (error) {
            console.error("Error while querying:", error);
            // Optionally handle error by sending a fallback message
            let errorResponse = {
                msg: "Error getting response from server.",
                time: new Date().toLocaleTimeString(),
                user: false
            };
            rooms[room].push(errorResponse);
            io.to(room).emit('chat_update', rooms[room]); // Emit the updated message list
        }
    });

    socket.on("disconnect", () => {
        // Optional: Handle user disconnecting from specific rooms if needed
        console.log(`User disconnected: ${socket.id}`);
        // Logic to clean up rooms can be added if needed
    });
});

server.listen(3001, () => {
    console.log('Server running on port 3001');
});
