import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { UserRouter } from './routes/user.js';
import cookieParser from 'cookie-parser';
import http from 'http';

const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(cookieParser());

app.use('/auth', UserRouter);

mongoose.connect('mongodb+srv://jjkweb:ug2team3@cluster0.b3naz.mongodb.net/authtication')
    .then(() => console.log('Connected to MongoDB'))
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
        socket.join(room);
    });

    socket.on("ask_query", ({ room, msg }) => {
        if (!rooms[room]) {
            rooms[room] = [];
        }
        msg = { ...msg, user: true };
        console.log(msg);
        rooms[room].push(msg);

        const postData = JSON.stringify({
            query: msg.msg
        });

        const options = {
            hostname: '127.0.0.1',
            port: 5000,
            path: '/query',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': postData.length
            }
        };

        const req = http.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                console.log(data); 

                try {
                    const response = JSON.parse(data);
                    const reply = response.answer;
                    let botResponse = {
                        msg: response.answer,
                        time: new Date().toLocaleTimeString(),
                        user: false
                    };

                    rooms[room].push(botResponse);
                    io.to(room).emit('chat_update', rooms[room]);

                } catch (error) {
                    console.error(error);
                    let errorResponse = {
                        msg: "Server error, please wait util the server is back online!",
                        time: new Date().toLocaleTimeString(),
                        user: false
                    };
                    rooms[room].push(errorResponse);
                    io.to(room).emit('chat_update', rooms[room]);
                }
            });
        });

        req.on('error', (error) => {
            console.error(error);
            let errorResponse = {
                msg: "Error getting response from server.",
                time: new Date().toLocaleTimeString(),
                user: false
            };
            rooms[room].push(errorResponse);
            io.to(room).emit('chat_update', rooms[room]);
        });

        req.write(postData);
        req.end();
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

server.listen(3001, () => {
    console.log('Server running on port 3001');
});
