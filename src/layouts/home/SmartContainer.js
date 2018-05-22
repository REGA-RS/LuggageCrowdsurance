import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

/*
 * Create component.
 */

class SmartContainer extends Component {
  constructor(props, context) {
    super(props);

    this.contracts = context.drizzle.contracts;

    const abi = this.contracts['LCSToken'].abi;

    // Fetch initial value from chain and return cache key for reactive updates.
    this.account = this.props.accounts[this.props.accountIndex];

    this.dataKey = this.contracts['LCSToken'].methods['getBizProcessId'].cacheCall(...[]);

    // Iterate over abi for correct function.
    for (var i = 0; i < abi.length; i++) {
      if (abi[i].name === 'getBizProcessId') {
          this.fnABI = abi[i];

          break;
      }
    }
  }

  render() {
    // No accounts found.
    if(Object.keys(this.props.accounts).length === 0 || !this.props.contracts['LCSToken'].initialized) {
      return (
        <span>Initializing...</span>
      )
    }

    // If the cache key we received earlier isn't in the store yet; the initial value is still being fetched.
    if(!(this.dataKey in this.props.contracts['LCSToken']['getBizProcessId'])) {
      return (
        <span>Fetching...</span>
      )
    }

    var displayData = this.props.contracts['LCSToken']['getBizProcessId'][this.dataKey].value
    var contractOwner = displayData['contractOwner'];
    var bizProcessId = displayData['bizProcessId'];

    if(this.account === contractOwner && this.props.ownerOnly) {
      return(
        <div className="pure-u-1-1"><h2>Owner Only</h2>{this.props.children}</div>
      )
    }
    else if((this.props.notOwnerOnly && this.account !== contractOwner) || (!this.props.notOwnerOnly && !this.props.ownerOnly)) {
      if(this.props.bizProcessId) {
        if(this.props.bizProcessId === bizProcessId) {
          return(
            <div className="pure-u-1-1"><h2>Member <small>[{bizProcessId}]</small></h2>{this.props.children}</div>
          )
        }
        else {
          return(
            null
          )
        }
      }
      else {
        return(
          <div className="pure-u-1-1">{this.props.children}</div>
        )
      }
    }
    else {
      return(
        null
      )
    }
  }
}

SmartContainer.contextTypes = {
  drizzle: PropTypes.object
}

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    contracts: state.contracts    
  }
}

export default drizzleConnect(SmartContainer, mapStateToProps)