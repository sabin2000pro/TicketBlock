import mongoose from "mongoose";

export default () => {
    const connectAuthSchema = async () => {
        
        return await mongoose.connect("mongodb+srv://sabin2000:123mini123@ticketblock.erhl8xc.mongodb.net/?retryWrites=true&w=majority").then(connection => {


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