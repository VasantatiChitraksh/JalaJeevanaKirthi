import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { UserRouter } from './routes/user.js';
import { FishRouter } from './routes/marinedata.js';
import { ForumsRouter } from './routes/forums.js';
import { BlogsRouter } from './routes/blogs.js';
import { DatasetRouter } from './routes/dataset.js';
import cookieParser from 'cookie-parser';
import http from 'http';
import https from 'https';

// Initialize Express app
const app = express();

app.use(express.json());
app.use(cors({
    origin: "https://jalajeevanakeerthi.vercel.app",
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(cookieParser());

// API Routes
app.use('/auth', UserRouter);
app.use('/data', FishRouter);
app.use('/api', ForumsRouter);
app.use('/blogs', BlogsRouter);
app.use('/datasets', DatasetRouter);

// Connect to MongoDB
mongoose.connect('mongodb+srv://jjkweb:ug2team3@cluster0.b3naz.mongodb.net/authtication')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Create HTTP server
const server = createServer(app);

// Set up Socket.io
const io = new Server(server, {
    cors: {
        origin: "https://jalajeevanakeerthi.vercel.app",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

// Room data
let rooms = {};

// Handle socket connections
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

        // Make a request to the Flask server
        const postData = JSON.stringify({
            query: msg.msg
        });

        const options = {
            hostname: '6a1b-34-106-136-173.ngrok-free.app',  // Replace with your Flask server hostname
            port: 443,             // Replace with your Flask server port
            path: '/query',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': postData.length
            }
        };

        const req = https.request(options, (res) => {
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
                        msg: reply,
                        time: new Date().toLocaleTimeString(),
                        user: false
                    };

                    rooms[room].push(botResponse);
                    console.log(botResponse)
                    io.to(room).emit('chat_update', rooms[room]);

                } catch (error) {
                    console.error(error);
                    let errorResponse = {
                        msg: "Server error, please wait until the server is back online!",
                        time: new Date().toLocaleTimeString(),
                        user: false
                    };
                    rooms[room].push(errorResponse);
                    print(rooms[room])
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

// Start the server
server.listen(3001, () => {
    console.log('Server running on port 3001');
});
