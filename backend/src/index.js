import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'

import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDB from './lib/mongoose.js'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import userRoutes from './routes/user.route.js'

const PORT = process.env.PORT

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: { origin: 'http://localhost:5173', credentials: true }
})

const userSocketMap = {};

// io connection event listener
// socket client event listener

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    if(userId) userSocketMap[userId] = socket.id;

    io.emit('getOnlineUsers', Object.keys(userSocketMap))
    socket.on('disconnect', () => {
        delete userSocketMap[userId]
        io.emit('getOnlineUsers', Object.keys(userSocketMap))
    })
})


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}))

app.get('/health-check', (req, res) => {
    console.log('pulsing..')
    res.status(200).json({ status: 'ok'})
})

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/user', userRoutes)

httpServer.listen(process.env.PORT, () => { connectDB().then(() => console.log('Server running on PORT: ', process.env.PORT))})

export { io, userSocketMap}