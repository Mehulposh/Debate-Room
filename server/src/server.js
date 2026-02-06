import express from 'express'
import dotenv from 'dotenv'
import {Db_Connection} from './dbConfig/db.config.js'
dotenv.config()

const PORT = process.env.PORT;

const app = express()

app.listen(PORT,()=> {
    console.log('app running on port '+ PORT);
    
})

Db_Connection()