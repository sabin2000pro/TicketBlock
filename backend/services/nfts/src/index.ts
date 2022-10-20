import { app } from "./app"

const port = process.env.PORT || 5201;

// Start of authentication server
const startNftServer = async () => {

      return app.listen(port, () => {
        console.log('NFT Service Live On Port 5201');
      });

}

startNftServer()