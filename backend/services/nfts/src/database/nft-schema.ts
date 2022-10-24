import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({path: '../../config.env'});

// Anonymous Function
export default () => {

    const connectNftSchema = async () => {

        try {

            return await mongoose.connect(process.env.DB_URI!).then(dbConn => {

                if(dbConn.connection) {
                    return {message: "Connected to NFT Schema", connectionError: false}
                }

                if(!dbConn.connection) {
                    return {message: "Could not connect to database", connectionError: true};
                }

            })
        } 
        
        catch(err: any) {

            if(err) {
                return console.error(err.message);
            }
        }


    }

    connectNftSchema();

}