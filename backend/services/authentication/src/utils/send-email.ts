
import nodemailer from "nodemailer"
require('dotenv').config();

export const emailTransporter = (): any => {

  
return nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "97f91e0d2279c6",
    pass: "44445d576ce426"
  }

    
  });


}