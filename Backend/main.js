const express = require ("express")
const app = express()
require('dotenv').config()
const cors = require('cors')

const connectDb = require('./Database/db')

//functionality
const userRouter = require('./Controllers/user')
const blogRouter = require('./Controllers/blogs')

//Middleware
const errorHandler = require('./Middleware/error-handler')
const notFound = require('./Middleware/not-found')


app.use(express.json())
app.use(cors())
app.use('/api/user',userRouter)
app.use('/api/blog',blogRouter)

app.use(errorHandler)
app.use(notFound)

const start = async()=>{
    const port = process.env.PORT
    try {
        connectDb(process.env.PORT)
        app.listen(port, console.log(`Server is listening on : ${port}`))
    } catch (error) {
        
    }
}

start()