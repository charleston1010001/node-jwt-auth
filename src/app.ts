import express, { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import 'dotenv/config'
import connect from './database'
const cors = require('cors')
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

const app: Application = express()

const corsOptions = {
    //origin: 'http://localhost:4000'
    origin: 'https://web.postman.co'
};

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// routes
authRoutes(app);
userRoutes(app);

app.get('/', (req: Request, res: Response) => {
    res.send('Application is running')
})

const PORT = process.env.PORT

const db = process.env.MONGODB
if (db) {
    connect({db})
} else {
    console.error('No database url provided')
    process.exit(1)
}

app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`)
})