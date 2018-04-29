import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Home extends Component {
  constructor(props, context) {
    super(props)

    this.contracts = context.drizzle.contracts
    this.handleScoringButton = this.handleScoringButton.bind(this)
    this.handleSendTokens = this.handleSendTokens.bind(this)
    this.handleApproveTokens = this.handleApproveTokens.bind(this)
    this.handleJoinButton = this.handleJoinButton.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)

    this.state = {
      joinAmount: 0,
      newMemberAddress: '',
      newMemberScore: 0,
      newMemberJoinAmount: 0,
      tokenRecipientAddress: '',
      tokenTransferAmount: 0,
      tokenApproveAddress: '',
      tokenApproveAmount: 0
    }
  }

  handleScoringButton() {
    this.contracts.LCSToken.methods.scoring(this.state.newMemberAddress, this.state.newMemberScore, this.state.newMemberJoinAmount).send()
  }

  handleSendTokens() {
    this.contracts.RSTToken.methods.transfer(this.state.tokenRecipientAddress, this.state.tokenTransferAmount).send()
  }

  handleApproveTokens() {
    this.contracts.RSTToken.methods.approve(this.state.tokenApproveAddress, this.state.tokenApproveAmount).send()
  }

  handleJoinButton() {
    this.contracts.LCSToken.methods.join().send({from: this.props.accounts[0], value: this.state.joinAmount})
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {

    // RSTbToken Vars
    var tokenSymbol = this.props.drizzleStatus.initialized ? this.contracts.RSTToken.methods.symbol.data() : ''
    var tokenSupply = this.props.drizzleStatus.initialized ? this.contracts.RSTToken.methods.totalSupply.data() : 'Loading...'
    var tokenBalance = this.props.drizzleStatus.initialized ? this.contracts.RSTToken.methods.balanceOf.data(this.props.accounts[0]) : 'Loading...'

    var joinAmount = this.props.drizzleStatus.initialized ? this.contracts.LCSToken.methods.apply.data() : 'Loading...'
    var joinBalance = this.props.drizzleStatus.initialized ? this.contracts.LCSToken.methods.balanceOf.data(this.props.accounts[0]) : 'Loading...'

    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>REGA Luggage Crowdsurance Examples</h1>
            <p>Examples of how to use REGA Crowdsurance contract.</p>
          </div>

          <div className="pure-u-1-1">
            <h2>LCSToken</h2>
            <h3>Score new member</h3>
            <form className="pure-form pure-form-stacked">
              <input name="newMemberAddress" type="text" value={this.state.newMemberAddress} onChange={this.handleInputChange} placeholder="Address" />
              <input name="newMemberScore" type="number" value={this.state.newMemberScore} onChange={this.handleInputChange} placeholder="Score" />
              <input name="newMemberJoinAmount" type="number" value={this.state.newMemberJoinAmount} onChange={this.handleInputChange} placeholder="Join amount" />
              <button className="pure-button" type="button" onClick={this.handleScoringButton}>Score {this.state.newMemberAddress}</button>
            </form>
            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>RSTToken</h2>
            <p><strong>Total Supply</strong>: {tokenSupply} {tokenSymbol}</p>
            <p><strong>My Balance</strong>: {tokenBalance}</p>
            <h3>Send Tokens</h3>
            <form className="pure-form pure-form-stacked">
              <input name="tokenRecipientAddress" type="text" value={this.state.tokenRecipientAddress} onChange={this.handleInputChange} placeholder="Address" />
              <input name="tokenTransferAmount" type="number" value={this.state.tokenTransferAmount} onChange={this.handleInputChange} placeholder="Amount" />
              <button className="pure-button" type="button" onClick={this.handleSendTokens}>Send Tokens to {this.state.tokenRecipientAddress}</button>
            </form>
            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>RSTToken</h2>
            <p><strong>Total Supply</strong>: {tokenSupply} {tokenSymbol}</p>
            <p><strong>My Balance</strong>: {tokenBalance}</p>
            <h3>Approve Token Transfer</h3>
            <form className="pure-form pure-form-stacked">
              <input name="tokenApproveAddress" type="text" value={this.state.tokenApproveAddress} onChange={this.handleInputChange} placeholder="Address" />
              <input name="tokenApproveAmount" type="number" value={this.state.tokenApproveAmount} onChange={this.handleInputChange} placeholder="Amount" />
              <button className="pure-button" type="button" onClick={this.handleApproveTokens}>Approve Transfer for {this.state.tokenApproveAddress}</button>
            </form>
            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>LCSToken</h2>
            <p><strong>Join Amount</strong>: {joinAmount}</p>
            <p><strong>Join Balance</strong>: {joinBalance}</p>
            <h3>Join Crowdsurance</h3>
            <form className="pure-form pure-form-stacked">
              <button className="pure-button" type="button" onClick={this.handleJoinButton}>Join </button>
            </form>
            <br/><br/>
          </div>

        </div>
      </main>
    )
  }
}

Home.contextTypes = {
  drizzle: PropTypes.object
}

export default Home
