import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import rega from '../../rega.png'
import BalanceData  from './BalanceData.js'

class Home extends Component {
  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            <img src={rega} alt="drizzle-logo" />
            <h1>REGA Luggage Crowdsurance Examples</h1>
            <p>Examples of how to use REGA Crowdsurance contract.</p>

            <br/><br/>
          </div>
        
          <div className="pure-u-1-1">
            <h2>Active Accounts</h2>
            <AccountData accountIndex="0" units="ether" precision="3" />

            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>LCSToken</h2>
            <h3>Pool structure</h3>
            <p><strong>Super Pool</strong>: <ContractData contract="LCSToken" method="valueOf" methodArgs={[1]} /> Wei </p>
            <p><strong>Pool</strong>: <ContractData contract="LCSToken" method="valueOf" methodArgs={[2]} /> Wei </p>
            <p><strong>Sub Pool</strong>: <ContractData contract="LCSToken" method="valueOf" methodArgs={[3]} /> Wei </p>
            <p><strong>Commission</strong>: <BalanceData contract="LCSToken" method="getComission" accountIndex="0" units="wei" correction="1" precision="3" viewOnly /> Wei </p>
            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>LCSToken</h2>
            <h3>The first stage is member scoring</h3>
            <p><strong>RST Address</strong>: <ContractData contract="LCSToken" method="RST" /></p>
            <p><strong>LCS Address</strong>: <ContractData contract="ERC20Adapter" method="controller" /></p>
            <p><strong>LCS Owner</strong>: <ContractData contract="LCSToken" method="owner" /></p>
            <p><strong>RST Join Amount</strong>: <BalanceData contract="LCSToken" method="joinAmountRST" accountIndex="0" units="nano" correction="1" precision="3" viewOnly /> <ContractData contract="RSTToken" method="symbol" hideIndicator /> </p>
            <p><strong>ERC20 Balance</strong>: <BalanceData contract="ERC20Adapter" method="balanceOf" accountIndex="0" units="ether" precision="4" /> Ether </p>
            <p><strong>LCS Balance</strong>: <ContractData contract="LCSToken" method="balanceOf" methodArgs={[this.props.accounts[0]]} /> <ContractData contract="LCSToken" method="symbol" hideIndicator /> </p>
            <h3>Score new member [owner only]</h3>
            <ContractForm contract="LCSToken" method="scoring" labels={['Member Address', 'Member Score', 'Join Amount']}/>

            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>RSTToken</h2>
            <h3>Transfer some RST Tokens to the new member.</h3>
            <p><strong>Total Supply</strong>: <BalanceData contract="RSTToken" method="totalSupply" accountIndex="0" units="nano" correction="1" precision="3" viewOnly /> <ContractData contract="RSTToken" method="symbol" hideIndicator /> </p>
            <p><strong>My Balance</strong>: <BalanceData contract="RSTToken" method="balanceOf" accountIndex="0" units="nano" precision="3" correction="1" /> <ContractData contract="RSTToken" method="symbol" hideIndicator /> </p>
            <h3>Token transfer</h3>
            <ContractForm contract="RSTToken" method="transfer" labels={['To Address', 'Amount to Transfer']} />
            
            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>RSTToken</h2>
            <h3>Now the new member need to approve token transfer.</h3>
            <p><strong>Total Supply</strong>: <BalanceData contract="RSTToken" method="totalSupply" accountIndex="0" units="nano" correction="1" precision="3" viewOnly /> <ContractData contract="RSTToken" method="symbol" hideIndicator /> </p>
            <p><strong>My Balance</strong>: <BalanceData contract="RSTToken" method="balanceOf" accountIndex="0" units="nano" precision="3" correction="1" /> <ContractData contract="RSTToken" method="symbol" hideIndicator /> </p>
            <p><strong>Allowance</strong>: <ContractData contract="RSTToken" method="allowance" methodArgs={[this.props.accounts[0],"0x9A343c4BD1676736872Ba4e531555b7924c72458"]} /> <ContractData contract="RSTToken" method="symbol" hideIndicator /></p>
            <h3>Approve token transfer</h3>
            <ContractForm contract="RSTToken" method="approve" labels={['To Address', 'Amount to Approve']} />
            
            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>LCSToken</h2>
            <h3>Finally call join from new member account</h3>
            <p><strong>Join Amount</strong>: <ContractData contract="LCSToken" method="addressToAmount" methodArgs={[this.props.accounts[0]]} /> Wei </p>
            <p><strong>Score</strong>: <ContractData contract="LCSToken" method="addressToScore" methodArgs={[this.props.accounts[0]]} /></p>
            <p><strong>LCS Balance</strong>: <ContractData contract="LCSToken" method="balanceOf" methodArgs={[this.props.accounts[0]]} /> <ContractData contract="LCSToken" method="symbol" hideIndicator /> </p>
            <h3>Join Crowdsurance</h3>
            <ContractForm contract="LCSToken" method="join" />

            <br/><br/>
          </div>
        </div>
      </main>
    )
  }
}

export default Home
