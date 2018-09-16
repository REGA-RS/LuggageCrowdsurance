import React, { Component } from 'react';
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import moment from 'moment';
import rega from '../../Case_Tape.jpg';
import BalanceData  from './BalanceData.js';
import SmartContainer from './SmartContainer.js';
import ContractFormExtension from './ContractFormExtension.js';
import Uploader from './Uploader.js';
import MsgForm from './MsgForm.js';
import ApplyForm from './ApplyForm.js';
import JoinForm from './JoinForm.js';



class Home extends Component {
  constructor(props, context) {
    super(props);
    console.log(props);
    console.log(context);

    this.setOption = this.setOption.bind(this);

    this.contracts = context.drizzle.contracts;

    var initialState = {};

    this.addresses = {
      TokenPool : context.drizzle.contracts.TokenPool._address,
      TokenContainer: context.drizzle.contracts.TokenContainer._address,
      LCSToken: context.drizzle.contracts.LCSToken._address,
      ERC20Adapter: context.drizzle.contracts.ERC20Adapter._address
    };

    this.currentTokenInfo = undefined;

    context.drizzle.contracts.LCSToken.methods.getCurrentTokenId().call()
      .then((result)=> {
        context.drizzle.contracts.LCSToken.methods.extensions(result).call()
          .then((data)=> {
            this.currentTokenInfo = data;
          });
      });


    this.dataKey = this.contracts['LCSToken'].methods['getBizProcessId'].cacheCall(...[]);
    this.dataKeyParameters = this.contracts['LCSToken'].methods['parameters'].cacheCall(...[]);

    initialState['option'] = 'RST';

    this.state = initialState;
  }
  setOption(option) {
    this.setState({ option });
  }
  renderSetSender(receiver, sender) {
    return (
      <SmartContainer accountIndex="0" ownerOnly init>
        <h3>{sender} Address</h3>
        <p>{this.addresses[sender]}</p>
        <h3>{receiver} Address</h3>
        <p>{this.addresses[receiver]}</p>
        <h3>Connectors</h3>
        <p><ContractData contract={receiver} method="connectors" methodArgs={[this.addresses[sender]]} /></p>
        <h3>{receiver} : setSender ( {sender} )</h3>
        <ContractForm contract={receiver} method="setSender" labels={[sender]} />

        <br/><br/>
      </SmartContainer>
    )
  }
  renderInit() {
    return (
      <SmartContainer accountIndex="0" ownerOnly init>
        <h3>Number of pools</h3>
        <p><ContractData contract="TokenPool" method="getPoolSize" /></p>
        <h3>TokenPool : init ( )</h3>
        <ContractForm contract="TokenPool" method="init" />
        <br/><br/>
      </SmartContainer>
    )
  }
  // enum Status {Init, Active, Claim, Approved, Rejected, Closed}
  renderTokenStatus(status) {
    switch(status) {
      case '0':
        return('Init');
      case '1':
        return('Active');
      case '2':
        return('Claim');
      case '3':
        return('Approved');
      case '4':
        return('Rejected');
      case '5':
        return('Closed');
      default:
        return('ERROR');
    }
  }

  precisionRound(number, precision) {
    var factor = Math.pow(10, precision)
    return Math.round(number * factor) / factor
  }

  renderInfoTabs() {

    if(!(this.dataKey in this.props['LCSToken']['getBizProcessId'])) {
      return (
        <span>Fetching...</span>
      )
    }

    if(!(this.dataKeyParameters in this.props['LCSToken']['parameters'])) {
      return (
        <span>Fetching...</span>
      )
    }

    if(this.currentTokenInfo === undefined) {
      return (
        <span>Fetching...</span>
      )
    }


    var displayDataParameters = this.props['LCSToken']['parameters'][this.dataKeyParameters].value
    var joinAmountETH = displayDataParameters['joinAmount'];

    var displayData = this.props['LCSToken']['getBizProcessId'][this.dataKey].value
    var bizProcessId = displayData['bizProcessId'];

    return (
        <Tabs>
        <h2>Information</h2>
          <TabList>
            <Tab>Account</Tab>
            <Tab>Contracts</Tab>
            <Tab>Token</Tab>
            <Tab disabled={bizProcessId === '100'}>Pools</Tab>
            <Tab disabled={bizProcessId === '100'}>Crowdsurance</Tab>
          </TabList>

          <TabPanel>
            <AccountData accountIndex="0" units="ether" precision="4" />
            <h3>Tokens</h3>
            <BalanceData contract="RSTToken" method="balanceOf" accountIndex="0" units="nano" precision="3" correction="1" /> <ContractData contract="RSTToken" method="symbol" hideIndicator />
            <p><ContractData contract="TokenContainer" method="balanceOf" methodArgs={[this.props.accounts[0]]} /> <ContractData contract="TokenContainer" method="symbol" hideIndicator /> [ <BalanceData contract="ERC20Adapter" method="balanceOf" accountIndex="0" units="ether" precision="4" /> Ether ] </p>
          </TabPanel>

          <TabPanel>
            <h3>LCST Token</h3>
            <p><ContractData contract="ERC20Adapter" method="root" /></p>
            <p><ContractData contract="LCSToken" method="owner" /> <strong>owner address</strong> </p>
            <p><ContractData contract="TokenContainer" method="totalSupply" /> <ContractData contract="TokenContainer" method="symbol" hideIndicator /></p>
            <h3>RST Token</h3>
            <p><ContractData contract="LCSToken" method="RST" /></p>
            <p><BalanceData contract="RSTToken" method="totalSupply" accountIndex="0" units="nano" correction="1" precision="3" viewOnly /> <ContractData contract="RSTToken" method="symbol" hideIndicator /> </p>
            <h3>Token Container</h3>
            <p>{this.addresses.TokenContainer}</p>
            <h3>Token Pool</h3>
            <p>{this.addresses.TokenPool}</p>
            <h3>ERC20 Adapter</h3>
            <p>{this.addresses.ERC20Adapter}</p>
            
          </TabPanel>

          <TabPanel>
            <h3>LCS Current Token</h3>
            <p><ContractData contract="LCSToken" method="getCurrentTokenId" /> </p>
            <h3>Token IDs</h3>
            <BalanceData contract="TokenContainer" method="tokensOfOwner" methodArgs={[this.props.accounts[0]]} array/>
            <h3>Join Amount [RST]</h3>
            <p><BalanceData contract="LCSToken" method="joinAmountRST" accountIndex="0" units="nano" correction="1" precision="3" viewOnly /> <ContractData contract="RSTToken" method="symbol" hideIndicator /> </p>
            <h3>Join Amount [Wei]</h3>
            <p>{joinAmountETH}</p>
          </TabPanel>

          <TabPanel>
            <h3>Super Pool</h3>
            <p><BalanceData contract="TokenContainer" method="valueOf" methodArgs={[1]} units="ether" precision="4" /> Ether </p>
            <h3>Pools</h3>
            <p><BalanceData contract="TokenContainer" method="valueOf" methodArgs={[2]} units="ether" precision="4" /> Ether </p>
            <h3>Sub Pools</h3>
            <p><BalanceData contract="TokenContainer" method="valueOf" methodArgs={[3]} units="ether" precision="4" /> Ether </p>
            <h3>Commission</h3>
            <p><BalanceData contract="TokenPool" method="getComission" accountIndex="0" units="ether" precision="4" viewOnly /> Ether </p>
            
          </TabPanel>
                    
          <TabPanel>
            <table>
              <tbody>
                <tr><td><strong>Join</strong></td><td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td>{this.currentTokenInfo.timeStamp==='0'?'-':moment.unix(this.currentTokenInfo.timeStamp).format("hh:mm DD/MM/YY")}</td><td></td></tr>
                <tr><td><strong>Activated</strong></td><td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td>{this.currentTokenInfo.activated==='0'?'-':moment.unix(this.currentTokenInfo.activated).format("hh:mm DD/MM/YY")}</td><td></td></tr>
                <tr><td><strong>End</strong></td><td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td>{this.currentTokenInfo.activated==='0'?'-':moment.unix(this.currentTokenInfo.activated).add(parseInt(this.currentTokenInfo.duration,10),'seconds').format("hh:mm DD/MM/YY")}</td><td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td>{this.currentTokenInfo.duration==='0'?'-':moment.duration(parseInt(this.currentTokenInfo.duration,10),'seconds').asDays()}&nbsp;Days</td></tr>
                <tr><td><strong>To Go</strong></td><td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td>{this.currentTokenInfo.activated==='0'?'-':this.precisionRound(moment.duration(moment.unix(this.currentTokenInfo.activated).add(parseInt(this.currentTokenInfo.duration,10),'seconds').diff(moment())).asDays(),1)}&nbsp;Days</td><td></td></tr>
                <tr><td><strong>Value</strong></td><td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td>{this.context.drizzle.web3.utils.fromWei(this.currentTokenInfo.amount, 'ether')}&nbsp;Ether</td><td></td></tr>
                <tr><td><strong>Paid</strong></td><td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td>{this.context.drizzle.web3.utils.fromWei(this.currentTokenInfo.paid, 'ether')}&nbsp;Ether</td><td></td></tr>
                <tr><td><strong>Claim number</strong></td><td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td>{this.currentTokenInfo.claimNumber}&nbsp;</td><td></td></tr>
                <tr><td><strong>Status</strong></td><td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td>{this.renderTokenStatus(this.currentTokenInfo.status)}&nbsp;</td><td></td></tr>
              </tbody>
            </table>
          </TabPanel>
          <br/><br/>
        </Tabs>
    )
  }
  renderInfo(t) {

    if(!(this.dataKeyParameters in this.props['LCSToken']['parameters'])) {
      return (
        <span>Fetching...</span>
      )
    }
    var displayDataParameters = this.props['LCSToken']['parameters'][this.dataKeyParameters].value
    var joinAmountETH = displayDataParameters['joinAmount'];

    return (
     <div>
        <h2>Smart Contract Information</h2>
        <h3>Current Account</h3>
        <AccountData accountIndex="0" units="ether" precision="4" />
        <BalanceData contract="RSTToken" method="balanceOf" accountIndex="0" units="nano" precision="3" correction="1" /> <ContractData contract="RSTToken" method="symbol" hideIndicator />
        <h3>RST Token Address</h3>
        <p><ContractData contract="LCSToken" method="RST" /></p>
        <p><BalanceData contract="RSTToken" method="totalSupply" accountIndex="0" units="nano" correction="1" precision="3" viewOnly /> <ContractData contract="RSTToken" method="symbol" hideIndicator /> </p>
        <h3>LCS Token Address</h3>
        <p><ContractData contract="ERC20Adapter" method="root" /></p>
        <p><ContractData contract="TokenContainer" method="balanceOf" methodArgs={[this.props.accounts[0]]} /> <ContractData contract="TokenContainer" method="symbol" hideIndicator /> </p>
        <p><BalanceData contract="ERC20Adapter" method="balanceOf" accountIndex="0" units="ether" precision="4" /> Ether </p>
        <h3>LCS Current Token</h3>
        <p><ContractData contract="LCSToken" method="getCurrentTokenId" /> </p>
        <h3>LCS Total Supply</h3>
        <p><ContractData contract="TokenContainer" method="totalSupply" /> </p>
        <h3>Application number</h3>
        <p><ContractData contract="LCSToken" method="appNumber" /></p>
        <h3>LCS Token Owner</h3>
        <p><ContractData contract="LCSToken" method="owner" /></p>
        <h3>Join Amount [RST]</h3>
        <p><BalanceData contract="LCSToken" method="joinAmountRST" accountIndex="0" units="nano" correction="1" precision="3" viewOnly /> <ContractData contract="RSTToken" method="symbol" hideIndicator /> </p>
        <h3>Join Amount [Wei]</h3>
        <p>{joinAmountETH}</p>
        {t && 
          <div>
            <h3>Super Pool</h3>
            <p><BalanceData contract="TokenContainer" method="valueOf" methodArgs={[1]} units="ether" precision="4" /> Ether </p>
            <h3>Pools</h3>
            <p><BalanceData contract="TokenContainer" method="valueOf" methodArgs={[2]} units="ether" precision="4" /> Ether </p>
            <h3>Sub Pools</h3>
            <p><BalanceData contract="TokenContainer" method="valueOf" methodArgs={[3]} units="ether" precision="4" /> Ether </p>
            <h3>Commission</h3>
            <p><BalanceData contract="TokenPool" method="getComission" accountIndex="0" units="ether" precision="4" viewOnly /> Ether </p>
            <h3>Token IDs</h3>
            <BalanceData contract="TokenContainer" method="tokensOfOwner" methodArgs={[this.props.accounts[0]]} array/>
          </div>
        }
        <br/><br/>
      </div>
    )
  }
  renderJoinTabs() {

    if(!(this.dataKey in this.props['LCSToken']['getBizProcessId'])) {
      return (
        <span>Fetching...</span>
      )
    }

    if(!(this.dataKeyParameters in this.props['LCSToken']['parameters'])) {
      return (
        <span>Fetching...</span>
      )
    }

    var displayDataParameters = this.props['LCSToken']['parameters'][this.dataKeyParameters].value
    var joinAmountETH = displayDataParameters['joinAmount'];

    var displayData = this.props['LCSToken']['getBizProcessId'][this.dataKey].value
    var bizProcessId = displayData['bizProcessId'];

    return (
      <SmartContainer accountIndex="0" notOwnerOnly bizProcessId={["3","4"]}>
        <Tabs>
          <TabList>
            <Tab>RST</Tab>
            <Tab disabled={bizProcessId === "4"}>ETH</Tab>
          </TabList>

          <TabPanel>
            <h2>Join with RST</h2>
            <SmartContainer accountIndex="0" notOwnerOnly bizProcessId={["3"]}>
              <p>Before join Crowdsurance with RST you need to approve token transfer from your account to LCS smart contract address. The amount to approve is join amount in RST</p>
              <h3>Current Account RST Balance</h3>
              <p><BalanceData contract="RSTToken" method="balanceOf" accountIndex="0" units="nano" precision="3" correction="1" /> <ContractData contract="RSTToken" method="symbol" hideIndicator /> </p>
              <h3>Allowance</h3>
              <p><BalanceData contract="RSTToken" method="allowance" methodArgs={[this.props.accounts[0],this.addresses.LCSToken]} units="nano" precision="3" correction="1" /> <ContractData contract="RSTToken" method="symbol" hideIndicator /></p>
              <h3>Join Amount [RST]</h3>
              <p><BalanceData contract="LCSToken" method="joinAmountRST" accountIndex="0" units="nano" correction="1" precision="3" viewOnly /> <ContractData contract="RSTToken" method="symbol" hideIndicator /> </p>
              <h3>Approve token transfer</h3>
              <p><strong>To Address</strong>: <ContractData contract="ERC20Adapter" method="root" /></p>
              <p><strong>Amount to Approve</strong>: <ContractData contract="LCSToken" method="joinAmountRST" /></p>
              <p>Just copy and paste information above in the form fields. Please note that <b>Amount to Approve</b> is an integer number and will be adjusted by the smart contract by the number of decimals for the RST token by dividing <b>Amount to Approve</b> by 10 ^ <ContractData contract="RSTToken" method="decimals" />. <br/><br/>If the transaction approval is done then <b>Allowance</b> will be equal to <b>Join Amount [RST]</b></p>
              <ContractForm contract="RSTToken" method="approve" labels={['To Address', 'Amount to Approve']} />
            
              <br/><br/>
            </SmartContainer>

            <SmartContainer accountIndex="0" notOwnerOnly bizProcessId={["4"]}>
              <p>If token transfer approval was done then the new member can join crowdsurance and RST tokens will be transfered from the new member account to the LCS owner account. </p>
              <h3>Join Info</h3>
              <p><strong>Join Amount [RST]</strong>: <BalanceData contract="LCSToken" method="joinAmountRST" accountIndex="0" units="nano" correction="1" precision="3" viewOnly /> <ContractData contract="RSTToken" method="symbol" hideIndicator /> </p>
              <p><strong>Balance</strong>: <ContractData contract="TokenContainer" method="balanceOf" methodArgs={[this.props.accounts[0]]} /> <ContractData contract="TokenContainer" method="symbol" hideIndicator /> </p>
              <h3>Crowdsurance ID</h3>
              <p><ContractData contract="LCSToken" method="getCurrentTokenId" /></p>
              <h3>Join Crowdsurance</h3>
              <ContractForm contract="LCSToken" method="join" />

              <br/><br/>
            </SmartContainer>

          </TabPanel>
          <TabPanel>
            <h2>Join with ETH</h2>
            <SmartContainer accountIndex="0" notOwnerOnly bizProcessId={["3"]}>
              <p>To Join crowdsurance transfer join amount in Wei from your account to crowdsurance pool</p>
              <h3>Join Amount [Wei]</h3>
              <p>{joinAmountETH}</p>
              <h3>Account Balance</h3>
              <p><AccountData accountIndex="0" units="ether" precision="4" /></p>
              <h3>Crowdsurance ID</h3>
              <p><ContractData contract="LCSToken" method="getCurrentTokenId" /></p>
              <h3>Join Crowdsurance</h3>
              <JoinForm contract="LCSToken" method="join" />
            </SmartContainer>
          </TabPanel>
        </Tabs>
      </SmartContainer>
    )
  }

  renderActivateTabs() {

    return (
      <SmartContainer accountIndex="0" notOwnerOnly bizProcessId={["10"]}>
        <Tabs>
          <TabList>
            <Tab>Activate</Tab>
            <Tab>Transfer</Tab>
          </TabList>

          <TabPanel>
            <h2>Activate</h2>
            <SmartContainer accountIndex="0" notOwnerOnly bizProcessId="10">
              <p>To protect your luggage activate crowdsurance token</p>
              <h3>Crowdsurance ID</h3>
              <p><ContractData contract="LCSToken" method="getCurrentTokenId" /></p>
              <h3>Activate Crowdsurance</h3>
              <ContractFormExtension contract="LCSToken" method="activateCurrent" extension={[{name:'Name', type:'text'}, {name:'Surname', type:'text'}]} />
            </SmartContainer>
    
          </TabPanel>

          <TabPanel>
            <h2>Transfer</h2>
            <SmartContainer accountIndex="0" notOwnerOnly bizProcessId="10">
              <p>Before activation you can Transfer LCST Token to a new member</p>
              <h3>Token IDs</h3>
              <BalanceData contract="TokenContainer" method="tokensOfOwner" methodArgs={[this.props.accounts[0]]} array/>
              <h3>Token transfer</h3>
              <ContractForm contract="TokenContainer" method="transfer" labels={['To Address', 'Token ID']} />
          </SmartContainer>
            
          </TabPanel>
        </Tabs>
      </SmartContainer>
    )
  }

  renderOwnerTabs() {

    if(!(this.dataKey in this.props['LCSToken']['getBizProcessId'])) {
      return (
        <span>Fetching...</span>
      )
    }

    var displayData = this.props['LCSToken']['getBizProcessId'][this.dataKey].value
    var bizProcessId = displayData['bizProcessId'];

    return (
      <SmartContainer accountIndex="0" ownerOnly>
        <Tabs>
          <TabList>
            <Tab>Scoring</Tab>
            <Tab>Send RST</Tab>
            <Tab>Transfer</Tab>
            <Tab>Select</Tab>
            <Tab disabled={bizProcessId !== "5"}>Vote</Tab>
          </TabList>

          <TabPanel>
            <h2>Scoring</h2>
            <p>The next step is new member scoring</p>
            <h3>Applications Info</h3>
            <ContractData contract="LCSToken" method="getApplication" />
            <h3>Applications number</h3>
            <p><ContractData contract="LCSToken" method="appNumber" /></p>
            <h3>Score new application [owner only]</h3> 
            <ContractForm contract="LCSToken" method="fssf" />
          </TabPanel>

          <TabPanel>
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
          </TabPanel>

          <TabPanel>
            <h2>LCST Transfer</h2>
            <p>Transfer LCST Token to the member</p>
            <p>DON'T TRANSFER POOLS TOKEN: 1,2,3</p>
            <h3>Token IDs</h3>
            <BalanceData contract="TokenContainer" method="tokensOfOwner" methodArgs={[this.props.accounts[0]]} array/>
            <h3>Token transfer</h3>
            <ContractForm contract="TokenContainer" method="transfer" labels={['To Address', 'Token ID']} />
          </TabPanel>

          <TabPanel>
            <h2>Select</h2>
            <p>Select jury to vote the claim payment</p>
            <h3>Number of claims waiting for jury</h3>
            <p><ContractData contract="LCSToken" method="getNumberOfClaims" /></p>
           
            <h3>Add Voter [owner only]</h3>
            <ContractForm contract="LCSToken" method="addVoter" labels={['Voter address']} />
          </TabPanel>

          <TabPanel>
            <SmartContainer accountIndex="0" bizProcessId="5">
              <h2>Vote</h2>
              <p>Vote for the claim that you have been selected</p>
              <h3>Activation Hash</h3>
              <p><ContractData contract="LCSToken" method="getHash" /></p>
              <h3>Cast Positive</h3>
              <p>To vote in favore of the case please enter in the form the name and surname of the member who has made the claim. You can found them below in the provided Claim documents.</p>
              <ContractFormExtension contract="LCSToken" method="castPositiveSelected" extension={[{name:'Name', type:'text'}, {name:'Surname', type:'text'}]} check />
              <h3>Cast Negative</h3>
              <ContractForm contract="LCSToken" method="castNegativeSelected"  />
              <br/><br/>
            </SmartContainer>
          </TabPanel>

        </Tabs>
      </SmartContainer>
    )
  }
  
  render() {
    return (
      <main className="container">
       
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            <img src={rega} alt="drizzle-logo" />
            <h1>REGA Luggage Crowdsurance</h1>
            <h3>Smart Contracts &nbsp;<small>v 0.1.2</small></h3>

            <br/><br/>
          </div>

          <SmartContainer accountIndex="0" notOwnerOnly ProgressBar>
            <h2>Biz process status</h2>
          </SmartContainer>


          {this.renderSetSender("TokenContainer", "TokenPool")}
          {this.renderSetSender("TokenPool", "LCSToken")}
          {this.renderInit()}
          {this.renderInfoTabs()}

          <SmartContainer accountIndex="0" notOwnerOnly bizProcessId={["1"]}>
            <h2>Apply</h2>
            <p>The first step is make an application and get application ID</p>
            <h3>Application Info</h3>
            
            <p><strong>Application ID</strong>: <ContractData contract="LCSToken" method="getAppID" /></p>
            <h3>Make Application</h3>
            <ApplyForm contract="LCSToken" method="apply" emitEvent="apply" />

            <br/><br/>
          </SmartContainer>

          <SmartContainer accountIndex="0" notOwnerOnly bizProcessId="2" >
            <h2>Wait</h2>
            <p>Wait for aplication approval...</p>

            <br/><br/>
          </SmartContainer>
          
          {this.renderJoinTabs()}
          {this.renderActivateTabs()}
          {this.renderOwnerTabs()}


          <SmartContainer accountIndex="0" notOwnerOnly bizProcessId="11">
            <h2>Claim</h2>
            <p>If your luggage is lost then make a claim for payment</p>
            <h3>Crowdsurance ID</h3>
            <p><ContractData contract="LCSToken" method="getCurrentTokenId" /></p>
           
            <h3>Claim Payment</h3>
            <Uploader contract="LCSToken" method="claimCurrent" extension={[{name:'name', type:'text'}, {name:'surname', type:'text'}, {name:'email', type:'text'}, {name:'PIRNumber', type:'text'}, {name:'PIRDate', type:'text'} ]} />

            <br/><br/>
          </SmartContainer>

          <SmartContainer accountIndex="0" notOwnerOnly bizProcessId="5">
            <h2>Vote</h2>
            <p>Vote for the claim that you have been selected</p>
            <h3>Activation Hash</h3>
            <p><ContractData contract="LCSToken" method="getHash" /></p>
            <h3>Cast Positive</h3>
            <p>To vote in favore of the case please enter in the form the name and surname of the member who has made the claim. You can found them below in the provided Claim documents.</p>
            <ContractFormExtension contract="LCSToken" method="castPositiveSelected" extension={[{name:'Name', type:'text'}, {name:'Surname', type:'text'}]} check />
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
            <h2>Rejected</h2>
            <h3>Current voting status</h3>
            <ContractData contract="LCSToken" method="getCurrentVotingStatus" />
            <p>Claim is rejected</p>

            <br/><br/>
          </SmartContainer>

        </div>
      </main>
    )
  }
}

export default Home
