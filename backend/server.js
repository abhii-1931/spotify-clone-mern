import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import songRouter from './src/routes/songRoutes.js'
import connectDB from './src/config/mongobd.js'
import connectCloudinary from './src/config/cloudinary.js'
import albumRouter from './src/routes/albumRoutes.js'


// app config
const app = express()
const port = process.env.PORT || 4000 
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

app.use('/api/song', songRouter)
app.use('/api/album', albumRouter)






// initialize routes
app.get('/', (req, res)=>{
    res.send('api working')
})


// listining
app.listen(port, ()=>{
    console.log(`server started on: http://localhost:${port}`)
})