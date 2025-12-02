const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const dbconfig = require('./dbconfig.js')
const dotEnv = require('dotenv')
dotEnv.config()

const app = express()
dbconfig.connectDb()

const userRoutes = require('./routes/user.route.js')
const movieRoutes = require('./routes/movie.route.js')
const theatreRoutes = require('./routes/theatre.route.js')
const showRoutes = require("./routes/show.routes.js")
const bookingRoutes = require("./routes/booking.route.js")

app.use(express.json())

// Accept CORS origin from environment, with sensible default for development
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}))
app.use(cookieParser())

app.use('/api/auth', userRoutes)
app.use('/api/movie',movieRoutes)
app.use("/api/theatre",theatreRoutes)
app.use("/api/shows",showRoutes)
app.use("/api/booking",bookingRoutes)

app.listen(8001,()=>{
    console.log('Server is running on port 8001');
})