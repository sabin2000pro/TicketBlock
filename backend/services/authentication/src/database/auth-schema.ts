import mongoose from "mongoose";
require('dotenv').config();

export default () => {
    
    const connectAuthSchema = async () => {
        
        return await mongoose.connect("mongodb+srv://sabin2000:123mini123@ticketblock.erhl8xc.mongodb.net/?retryWrites=true&w=majority").then(connection => {


            if(connection.connection) {
                return console.log(`Connected to auth schema..`)
            }

            else {
                return console.log(`Could not connect to the auth schema`)
            }


        })
    }

    connectAuthSchema();
}