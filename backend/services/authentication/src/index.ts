import { app } from "./app"

const port = process.env.PORT || 5200;

// Start of authentication server
const startAuthServer = async () => {

      return app.listen(port, () => {
        console.log('Authentication Service Live On Port 5200');
      });

}

startAuthServer()