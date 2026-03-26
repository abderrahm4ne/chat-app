import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDB from './lib/mongoose.js'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import userROutes from './routes/user.route.js'

dotenv.config()
const PORT = process.env.PORT

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}))

app.get('/health-check', (req, res) => {
    console.log('pulsing..')
})

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/user')

app.listen(PORT, () => {
    connectDB()
    console.log('Server running on PORT: ', PORT)
})