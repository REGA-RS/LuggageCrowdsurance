import LCSToken from './../build/contracts/LCSToken.json'
import ERC20Adapter from './../build/contracts/ERC20Adapter.json'
import RSTToken from './../build/contracts/RSTToken.json'

const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:7545'
    }
  },
  contracts: [
    RSTToken,
    ERC20Adapter,
    LCSToken
  ],
  events: {
    RSTToken: ['Approval','Transfer'],
    LCSToken: ['Apply','Join']
  },
  polls: {
    accounts: 1500
  }
}

export default drizzleOptions