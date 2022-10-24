import mongoose from "mongoose";
require('dotenv').config();

export default () => {
    const connectAuthSchema = async () => {
        
        return await mongoose.connect(process.env.DB_URI!).then(connection => {


            if(connection.connection) {
                return console.log(`Connected to AUTH database..`)
            }

            else {
                return console.log(`Could not connect to auth database`)
            }


        })
    }

    connectAuthSchema();
}