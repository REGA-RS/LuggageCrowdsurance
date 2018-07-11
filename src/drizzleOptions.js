import LCSToken from './../build/contracts/LCSToken.json'
import ERC20Adapter from './../build/contracts/ERC20Adapter.json'
import RSTToken from './../build/contracts/RSTToken.json'
import TokenContainer from './../build/contracts/TokenContainer.json'
import TokenPool from './../build/contracts/TokenPool.json'

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
    LCSToken,
    TokenContainer,
    TokenPool
  ],
  events: {
    RSTToken: ['Approval','Transfer'],
    LCSToken: ['Apply','Join', 'Scoring', 'Activate', 'Claim', 'Vote', 'Payment', 'FSSF'],
    TokenContainer: ['AddToken', 'RemoveToken', 'Transfer', 'AddValue', 'RemoveValue', 'SetLevel', 'IncreaseLevel','SenderUpdate'],
    TokenPool: ['InsertPool', 'DistributeValue','SecondTierCall', 'ShortOfFunds', 'PaymentValue','SenderUpdate']
  },
  polls: {
    accounts: 1500
  }
}

export default drizzleOptions