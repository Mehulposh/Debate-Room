import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI //mongo db connection string
const DbName = process.env.DB_NAME //db name


//function to connect to db
export const  Db_Connection = async ()=> {
    try {
        const connection = await mongoose.connect(`${MONGODB_URI}${DbName}`)
        if(connection) console.log('Mongo Db connected to '+DbName);
        
    } catch (error) {
        console.log('Error connecting to db');
        process.exit(1)
    }
}

