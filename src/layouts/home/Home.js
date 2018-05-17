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
            <h1>REGA Luggage Crowdsurance</h1>
            <h3>Smart contract test inviroment</h3>

            <br/><br/>
          </div>
        
          <div className="pure-u-1-1">
            <h2>Smart Contract Information</h2>
            <h3>Current Account</h3>
            <AccountData accountIndex="0" units="ether" precision="4" />
            <h3>RST Token Address</h3>
            <p><ContractData contract="LCSToken" method="RST" /></p>
            <p><BalanceData contract="RSTToken" method="totalSupply" accountIndex="0" units="nano" correction="1" precision="3" viewOnly /> <ContractData contract="RSTToken" method="symbol" hideIndicator /> </p>
            <h3>LCS Token Address</h3>
            <p><ContractData contract="ERC20Adapter" method="controller" /></p>
            <p><ContractData contract="LCSToken" method="balanceOf" methodArgs={[this.props.accounts[0]]} /> <ContractData contract="LCSToken" method="symbol" hideIndicator /> </p>
            <p><BalanceData contract="ERC20Adapter" method="balanceOf" accountIndex="0" units="ether" precision="4" /> Ether </p>
            <h3>LCS Token Owner</h3>
            <p><ContractData contract="LCSToken" method="owner" /></p>
            <h3>Super Pools</h3>
            <p><BalanceData contract="LCSToken" method="valueOf" methodArgs={[1]} units="ether" precision="4" /> Ether </p>
            <h3>Pools</h3>
            <p><BalanceData contract="LCSToken" method="valueOf" methodArgs={[2]} units="ether" precision="4" /> Ether </p>
            <h3>Sub Pools</h3>
            <p><BalanceData contract="LCSToken" method="valueOf" methodArgs={[3]} units="ether" precision="4" /> Ether </p>
            <h3>Commission</h3>
            <p><BalanceData contract="LCSToken" method="getComission" accountIndex="0" units="ether" precision="4" viewOnly /> Ether </p>
            <h3>Join Amount [RST]</h3>
            <p><BalanceData contract="LCSToken" method="joinAmountRST" accountIndex="0" units="nano" correction="1" precision="3" viewOnly /> <ContractData contract="RSTToken" method="symbol" hideIndicator /> </p>

            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>Apply</h2>
            <p>The first step is make an application and get application ID</p>
            <h3>Application Info</h3>
            <p><strong>Join Amount</strong>: <BalanceData contract="LCSToken" method="getJoinAmount" units="ether" precision="4" viewOnly /> Ether </p>
            <p><strong>Score</strong>: <ContractData contract="LCSToken" method="getScore" /></p>
            <p><strong>Application ID</strong>: <ContractData contract="LCSToken" method="getAppID" /></p>
            <h3>Make Application</h3>
            <ContractForm contract="LCSToken" method="apply" />

            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>Score</h2>
            <p>The next step is new member scoring</p>
            <h3>Applications Info</h3>
            <p><strong>Application number</strong>: <ContractData contract="LCSToken" method="appNumber" /></p>
            <h3>Score new application [owner only]</h3>
            
            <ContractForm contract="LCSToken" method="fssf" />

            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>Transfer</h2>
            <p>Transfer some RST Tokens to the new member if needed.</p>
            <h3>Current Account RST Balance</h3>
            <p><BalanceData contract="RSTToken" method="balanceOf" accountIndex="0" units="nano" precision="3" correction="1" /> <ContractData contract="RSTToken" method="symbol" hideIndicator /> </p>
            <h3>Token transfer</h3>
            <ContractForm contract="RSTToken" method="transfer" labels={['To Address', 'Amount to Transfer']} />
            
            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>Approve</h2>
            <p>Now the new member need to approve token transfer.</p>
            <h3>Current Account RST Balance</h3>
            <p><BalanceData contract="RSTToken" method="balanceOf" accountIndex="0" units="nano" precision="3" correction="1" /> <ContractData contract="RSTToken" method="symbol" hideIndicator /> </p>
            <h3>Allowance</h3>
            <p><BalanceData contract="RSTToken" method="allowance" methodArgs={[this.props.accounts[0],"0x9A343c4BD1676736872Ba4e531555b7924c72458"]} units="nano" precision="3" correction="1" /> <ContractData contract="RSTToken" method="symbol" hideIndicator /></p>
            <h3>Approve token transfer</h3>
            <ContractForm contract="RSTToken" method="approve" labels={['To Address', 'Amount to Approve']} />
            
            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>Join</h2>
            <p>Now new member can join crowdsurance</p>
            <h3>Join Info</h3>
            <p><strong>Join Amount</strong>: <BalanceData contract="LCSToken" method="getJoinAmount" units="ether" precision="4" viewOnly /> Ether </p>
            <p><strong>Score</strong>: <ContractData contract="LCSToken" method="getScore" /></p>
            <p><strong>Balance</strong>: <ContractData contract="LCSToken" method="balanceOf" methodArgs={[this.props.accounts[0]]} /> <ContractData contract="LCSToken" method="symbol" hideIndicator /> </p>
            <h3>Join Crowdsurance</h3>
            <ContractForm contract="LCSToken" method="join" />

            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>Activate</h2>
            <p>To protect your luggage activate crowdsurance</p>
            <h3>Activate Crowdsurance</h3>
            <ContractForm contract="LCSToken" method="activate" labels={['NFT Token ID']} />

            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>Claim</h2>
            <p>If your luggage is lost then make a claim for payment</p>
           
            <h3>Claim Payment</h3>
            <ContractForm contract="LCSToken" method="claim" labels={['NFT Token ID','Claim Amount']} />

            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>Select</h2>
            <p>Select jury to vote the claim payment</p>
           
            <h3>Add Voter [owner only]</h3>
            <ContractForm contract="LCSToken" method="addVoter" labels={['Voter address','NFT Token ID']} />

            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>Vote</h2>
            <p>Now jury can vote for the claim</p>
            <h3>Voting Results</h3>
            <ContractData contract="LCSToken" method="votingStatus" methodArgs={[4]} />
            <h3>Cast Positive</h3>
            <ContractForm contract="LCSToken" method="castPositive" labels={['NFT Token ID']} />
            <h3>Cast Negative</h3>
            <ContractForm contract="LCSToken" method="castNegative" labels={['NFT Token ID']} />
            <br/><br/>
          </div>

           <div className="pure-u-1-1">
            <h2>Receive</h2>
            <p>Now receive claim payment</p>
            <h3>Claim Info</h3>
            <ContractData contract="LCSToken" method="extensions" methodArgs={[4]} />
           
            <h3>PAYMENT</h3>
            <ContractForm contract="LCSToken" method="payment" labels={['NFT Token ID']} />

            <br/><br/>
          </div>

        </div>
      </main>
    )
  }
}

export default Home
