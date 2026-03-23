import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()
const PORT = process.env.PORT

const app = express();
app.use(express.json())
app.use(cookieParser())

app.get('/health-check', (req, res) => {
    console.log('pulsing..')
})

app.listen(PORT, () => {
    console.log('Server running on PORT: ', PORT)
})