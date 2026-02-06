import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT;

const app = express()

app.listen(()=> {
    console.log('app running on port '+ PORT);
    
})

