const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')

require('dotenv').config()
//import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const dealRoutes = require('./routes/deal');
const categoryRoutes = require('./routes/category')


// app
const app = express()

// db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => console.log("DB Connected"))

//middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(expressValidator())
app.use(cookieParser())

//routes middleware
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", dealRoutes)
app.use("/api", categoryRoutes)


const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`server is running on ${port}`)
})