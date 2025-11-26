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

app.use(express.json())

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())

app.use('/api/auth', userRoutes)
app.use('/api/movie',movieRoutes)
app.use("/api/theatre",theatreRoutes)
app.use("/api/shows",showRoutes)

app.listen(8001,()=>{
    console.log('Server is running on port 8001');
})