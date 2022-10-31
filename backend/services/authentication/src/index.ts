import { app } from "./app"

const port = process.env.PORT;

// Start of authentication server
const startAuthServer = async () => {

      return app.listen(port, () => {
        console.log(`Listening auth service on port ${port}`)
      });

}

startAuthServer()