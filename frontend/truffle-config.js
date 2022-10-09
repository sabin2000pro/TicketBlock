module.exports = {
  
  contracts_build_directory: "./public/contracts",

  networks: {
    
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    }

  },

  compilers: {
    solc: {
      version: "0.8.17",
      settings: {

        optimizer: {
          enabled: true, // Default: false
          runs: 200      // Default: 200
        },
      }
    }
  }
};
