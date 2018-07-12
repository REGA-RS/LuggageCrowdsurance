var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "first mix any adult deal sand brand about window will casual second";

module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/fyE6fpwJWFc6fBYSet1w");
      },
      network_id: 4
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/BymPe6F1XQoQ3ZwlEzme");
      },
      network_id: 3
    },
    mainnet: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://mainnet.infura.io/fyE6fpwJWFc6fBYSet1w");
      },
      network_id: 1,
      gasPrice: 16000000000
    }  
  },
  solc: {
    optimizer: {
      enabled: false,
      runs: 500
    }
  } 
};
