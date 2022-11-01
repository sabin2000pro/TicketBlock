
import nodemailer, { TransportOptions } from "nodemailer"
require('dotenv').config();

export const emailTransporter = (): any => {

return nodemailer.createTransport({

    host: process.env.SMTP_PROVIDER as any,
    port: process.env.SMTP_PORT as any,

    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }

    
  });


}