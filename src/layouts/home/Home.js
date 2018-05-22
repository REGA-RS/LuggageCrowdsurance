import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import rega from '../../rega.png'
import BalanceData  from './BalanceData.js'
import SmartContainer from './SmartContainer.js'

class Home extends Component {
  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            <img src={rega} alt="drizzle-logo" />
            <h1>REGA Luggage Crowdsurance</h1>
            <h3>Smart contract test enviroment</h3>

            <br/><br/>
          </div>

          <SmartContainer accountIndex="0" ownerOnly>
            <h2>Test check list</h2>
            <label>
              <input type="checkbox" name="ether_transfer" /> &nbsp;
              01&nbsp;-&nbsp;Transfer Ether to the LCS Smart contract &nbsp;
            </label>
            <br/>
            <label>
              <input type="checkbox" name="rst_transfer" /> &nbsp;
              02&nbsp;-&nbsp;Transfer RST tokens to the new member address &nbsp;
            </label>
            <br/>
            <label>
              <input type="checkbox" name="apply" /> &nbsp;
              04&nbsp;-&nbsp;Score the new member &nbsp;
            </label>
            <br/>
            <label>
              <input type="checkbox" name="jury" /> &nbsp;
              05&nbsp;-&nbsp;Select juries &nbsp;
            </label>
            <br/>
            <label>
              <input type="checkbox" name="voting" /> &nbsp;
              06&nbsp;-&nbsp;Juries voting &nbsp;[juries]
            </label>
            <br/><br/>
          </SmartContainer>

          <SmartContainer accountIndex="0" notOwnerOnly>
            <h2>New member check list</h2>
            <label>
              <input type="checkbox" name="apply" /> &nbsp;
              01&nbsp;-&nbsp;Make a application &nbsp;
            </label>
            <br/>
            <label>
              <input type="checkbox" name="allowance" /> &nbsp;
              02&nbsp;-&nbsp;Provide an allowance to LCS for RST transfer &nbsp;
            </label>
            <br/>
            <label>
              <input type="checkbox" name="join" /> &nbsp;
              03&nbsp;-&nbsp;Join to crowdsurance &nbsp;
            </label>
            <br/>
            <label>
              <input type="checkbox" name="activate" /> &nbsp;
              04&nbsp;-&nbsp;Activate crowdsurance token &nbsp;
            </label>
            <br/>
            <label>
              <input type="checkbox" name="claim" /> &nbsp;
              05&nbsp;-&nbsp;Make a claim &nbsp;
            </label>
            <br/>
            <label>
              <input type="checkbox" name="payment" /> &nbsp;
              06&nbsp;-&nbsp;Collect claim payment &nbsp;
            </label>
            <br/><br/>
          </SmartContainer>
        
          <SmartContainer accountIndex="0">
            <h2>Smart Contract Information</h2>
            <h3>Current Account</h3>
            <AccountData accountIndex="0" units="ether" precision="4" />
            <BalanceData contract="RSTToken" method="balanceOf" accountIndex="0" units="nano" precision="3" correction="1" /> <ContractData contract="RSTToken" method="symbol" hideIndicator />
            <h3>RST Token Address</h3>
            <p><ContractData contract="LCSToken" method="RST" /></p>
            <p><BalanceData contract="RSTToken" method="totalSupply" accountIndex="0" units="nano" correction="1" precision="3" viewOnly /> <ContractData contract="RSTToken" method="symbol" hideIndicator /> </p>
            <h3>LCS Token Address</h3>
            <p><ContractData contract="ERC20Adapter" method="controller" /></p>
            <p><ContractData contract="LCSToken" method="balanceOf" methodArgs={[this.props.accounts[0]]} /> <ContractData contract="LCSToken" method="symbol" hideIndicator /> </p>
            <p><BalanceData contract="ERC20Adapter" method="balanceOf" accountIndex="0" units="ether" precision="4" /> Ether </p>
            <h3>LCS Current Token</h3>
            <p><ContractData contract="LCSToken" method="getCurrentTokenId" /> </p>
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
          </SmartContainer>

          <SmartContainer accountIndex="0" notOwnerOnly bizProcessId="1">
            <h2>Apply</h2>
            <p>The first step is make an application and get application ID</p>
            <h3>Application Info</h3>
            
            <p><strong>Application ID</strong>: <ContractData contract="LCSToken" method="getAppID" /></p>
            <h3>Make Application</h3>
            <ContractForm contract="LCSToken" method="apply" />

            <br/><br/>
          </SmartContainer>

          <SmartContainer accountIndex="0" notOwnerOnly bizProcessId="2">
            <h2>Wait</h2>
            <p>Wait for aplication approval...</p>

            <br/><br/>
          </SmartContainer>

          <SmartContainer accountIndex="0" ownerOnly>
            <h2>Transfer</h2>
            <p>Transfer some RST Tokens to the new member if needed.</p>
            <h3>Applications Info</h3>
            <ContractData contract="LCSToken" method="getApplication" />
            <h3>Current Account RST Balance</h3>
            <p><BalanceData contract="RSTToken" method="balanceOf" accountIndex="0" units="nano" precision="3" correction="1" /> <ContractData contract="RSTToken" method="symbol" hideIndicator /> </p>
            <h3>Amount to transfer</h3>
            <p>100000000000</p>
            <h3>Token transfer</h3>
            <ContractForm contract="RSTToken" method="transfer" labels={['To Address', 'Amount to Transfer']} />
            
            <br/><br/>
          </SmartContainer>

          <SmartContainer accountIndex="0" ownerOnly>
            <h2>Score</h2>
            <p>The next step is new member scoring</p>
            <h3>Applications Info</h3>
            <ContractData contract="LCSToken" method="getApplication" />
            <h3>Applications number</h3>
            <p><ContractData contract="LCSToken" method="appNumber" /></p>
            <h3>Score new application [owner only]</h3>
            
            <ContractForm contract="LCSToken" method="fssf" />

            <br/><br/>
          </SmartContainer>

          <SmartContainer accountIndex="0" notOwnerOnly bizProcessId="3">
            <h2>Approve</h2>
            <p>Before join Crowdsurance the the new member need to approve token transfer from own account to LCS smart contract address. The amount to approve is join amount in RST</p>
            <h3>Current Account RST Balance</h3>
            <p><BalanceData contract="RSTToken" method="balanceOf" accountIndex="0" units="nano" precision="3" correction="1" /> <ContractData contract="RSTToken" method="symbol" hideIndicator /> </p>
            <h3>Allowance</h3>
            <p><BalanceData contract="RSTToken" method="allowance" methodArgs={[this.props.accounts[0],"0x9A343c4BD1676736872Ba4e531555b7924c72458"]} units="nano" precision="3" correction="1" /> <ContractData contract="RSTToken" method="symbol" hideIndicator /></p>
            <h3>Join Amount [RST]</h3>
            <p><BalanceData contract="LCSToken" method="joinAmountRST" accountIndex="0" units="nano" correction="1" precision="3" viewOnly /> <ContractData contract="RSTToken" method="symbol" hideIndicator /> </p>
            <h3>Approve token transfer</h3>
            <p><strong>To Address</strong>: <ContractData contract="ERC20Adapter" method="controller" /></p>
            <p><strong>Amount to Approve</strong>: <ContractData contract="LCSToken" method="joinAmountRST" /></p>
            <p>Just copy and paste information above in the form fields. Please note that <b>Amount to Approve</b> is an integer number and will be adjusted by the smart contract by the number of decimals for the RST token by dividing <b>Amount to Approve</b> by 10 ^ <ContractData contract="RSTToken" method="decimals" />. <br/><br/>If the transaction approval is done then <b>Allowance</b> will be equal to <b>Join Amount [RST]</b></p>
            <ContractForm contract="RSTToken" method="approve" labels={['To Address', 'Amount to Approve']} />
            
            <br/><br/>
          </SmartContainer>

          <SmartContainer accountIndex="0" notOwnerOnly bizProcessId="4">
            <h2>Join</h2>
            <p>If token transfer approval was done then the new member can join crowdsurance and RST tokens will be transfered from the new member account to the LCS owner account. </p>
            <h3>Join Info</h3>
            <p><strong>Join Amount</strong>: <BalanceData contract="LCSToken" method="joinAmountRST" accountIndex="0" units="nano" correction="1" precision="3" viewOnly /> <ContractData contract="RSTToken" method="symbol" hideIndicator /> </p>
            <p><strong>Balance</strong>: <ContractData contract="LCSToken" method="balanceOf" methodArgs={[this.props.accounts[0]]} /> <ContractData contract="LCSToken" method="symbol" hideIndicator /> </p>
            <h3>Crowdsurance ID</h3>
            <p><ContractData contract="LCSToken" method="getCurrentTokenId" /></p>
            <h3>Join Crowdsurance</h3>
            <ContractForm contract="LCSToken" method="join" />

            <br/><br/>
          </SmartContainer>

          <SmartContainer accountIndex="0" notOwnerOnly bizProcessId="10">
            <h2>Activate</h2>
            <p>To protect your luggage activate crowdsurance</p>
            <h3>Crowdsurance ID</h3>
            <p><ContractData contract="LCSToken" method="getCurrentTokenId" /></p>
            <h3>Activate Crowdsurance</h3>
            <ContractForm contract="LCSToken" method="activateCurrent" />

            <br/><br/>
          </SmartContainer>

          <SmartContainer accountIndex="0" notOwnerOnly bizProcessId="11">
            <h2>Claim</h2>
            <p>If your luggage is lost then make a claim for payment</p>
            <h3>Crowdsurance ID</h3>
            <p><ContractData contract="LCSToken" method="getCurrentTokenId" /></p>
           
            <h3>Claim Payment</h3>
            <ContractForm contract="LCSToken" method="claimCurrent" />

            <br/><br/>
          </SmartContainer>

          <SmartContainer accountIndex="0" ownerOnly>
            <h2>Select</h2>
            <p>Select jury to vote the claim payment</p>
            <h3>Number of claims waiting for jury</h3>
            <p><ContractData contract="LCSToken" method="getNumberOfClaims" /></p>
           
            <h3>Add Voter [owner only]</h3>
            <ContractForm contract="LCSToken" method="addVoter" labels={['Voter address']} />

            <br/><br/>
          </SmartContainer>

          <SmartContainer accountIndex="0" bizProcessId="5">
            <h2>Vote</h2>
            <p>Vote for the claim that you have been selected</p>
            <h3>Claim data</h3>
            <p>Information for the claim will be here ...</p>
            <h3>Cast Positive</h3>
            <ContractForm contract="LCSToken" method="castPositiveSelected"  />
            <h3>Cast Negative</h3>
            <ContractForm contract="LCSToken" method="castNegativeSelected"  />
            <br/><br/>
          </SmartContainer>

          <SmartContainer accountIndex="0" notOwnerOnly bizProcessId="20">
            <h2>Wait</h2>
            <p>Wait for claim payment approval...</p>
            <h3>Current voting status</h3>
            <ContractData contract="LCSToken" method="getCurrentVotingStatus" />

            <br/><br/>
          </SmartContainer>

           <SmartContainer accountIndex="0" notOwnerOnly bizProcessId="21">
            <h2>Receive</h2>
            <p>Now receive claim payment</p>
            <h3>Current voting status</h3>
            <ContractData contract="LCSToken" method="getCurrentVotingStatus" />
            <h3>LCS Current Token</h3>
            <p><ContractData contract="LCSToken" method="getCurrentTokenId" /> </p>
           
            <h3>PAYMENT</h3>
            <ContractForm contract="LCSToken" method="paymentCurrent" />

            <br/><br/>
          </SmartContainer>

          <SmartContainer accountIndex="0" notOwnerOnly bizProcessId="22">
            <h2>Receive</h2>
            <p>Claim is rejected but you can receive join amount</p>
            <h3>Claim Info</h3>
            <ContractData contract="LCSToken" method="tokenIndexToOwner" methodArgs={[4]} />
            <ContractData contract="LCSToken" method="extensions" methodArgs={[4]} />
            <ContractData contract="LCSToken" method="requests" methodArgs={[4]} />
           
            <h3>PAYMENT</h3>
            <ContractForm contract="LCSToken" method="payment" labels={['NFT Token ID']} />

            <br/><br/>
          </SmartContainer>

          <SmartContainer accountIndex="0" notOwnerOnly bizProcessId="23">
            <h2>Rejacted</h2>
            <p>Claim is rejected</p>

            <br/><br/>
          </SmartContainer>

        </div>
      </main>
    )
  }
}

export default Home
