import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import rega from '../../rega.png'

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
            <p>The first stage is member scoring</p>
            <ContractForm contract="LCSToken" method="scoring" labels={['Member Address', 'Member Score', 'Join Amount']}/>

            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>RSTToken</h2>
            <p>Transfer some RST Tokens to the new member.</p>
            <p><strong>Total Supply</strong>: <ContractData contract="RSTToken" method="totalSupply" /> <ContractData contract="RSTToken" method="symbol" hideIndicator /></p>
            <p><strong>My Balance</strong>: <ContractData contract="RSTToken" method="balanceOf" methodArgs={[this.props.accounts[0]]} /></p>
            <h3>Token transfer</h3>
            <ContractForm contract="RSTToken" method="transfer" labels={['To Address', 'Amount to Transfer']} />
            
            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>RSTToken</h2>
            <p>Now the new member need to approve token transfer to LCSToken Owner Account.</p>
            <p><strong>Total Supply</strong>: <ContractData contract="RSTToken" method="totalSupply" /> <ContractData contract="RSTToken" method="symbol" hideIndicator /></p>
            <p><strong>My Balance</strong>: <ContractData contract="RSTToken" method="balanceOf" methodArgs={[this.props.accounts[0]]} /></p>
            <h3>Approve token transfer</h3>
            <ContractForm contract="RSTToken" method="approve" labels={['To Address', 'Amount to Approve']} />
            
            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>LCSToken</h2>
            <p>Finally call join from new member account</p>
            <p><strong>Join amount</strong>: <ContractData contract="LCSToken" method="apply" /></p>
            <p><strong>Join Balance</strong>: <ContractData contract="LCSToken" method="balanceOf" methodArgs={[this.props.accounts[0]]} /></p>
            <ContractForm contract="LCSToken" method="join" />

            <br/><br/>
          </div>
        </div>
      </main>
    )
  }
}

export default Home
