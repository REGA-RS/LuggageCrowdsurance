import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

/*
 * Create component.
 */

class BalanceData extends Component {
  constructor(props, context) {
    super(props);

    this.precisionRound = this.precisionRound.bind(this);

    this.contracts = context.drizzle.contracts

    // Get the contract ABI
    const abi = this.contracts[this.props.contract].abi;

    // Fetch initial value from chain and return cache key for reactive updates.
    var methodArgs = [this.props.accounts[this.props.accountIndex]];

    if (this.props.methodArgs) {
      methodArgs = this.props.methodArgs;
    }
    if (this.props.viewOnly) {
      methodArgs = [];
    }
    
    this.dataKey = this.contracts[this.props.contract].methods[this.props.method].cacheCall(...methodArgs);

    // Iterate over abi for correct function.
    for (var i = 0; i < abi.length; i++) {
      if (abi[i].name === this.props.method) {
          this.fnABI = abi[i];

          break;
      }
    }
  }

  precisionRound(number, precision) {
    var factor = Math.pow(10, precision)
    return Math.round(number * factor) / factor
  }

  render() {
    // No accounts found.
    if(Object.keys(this.props.accounts).length === 0 || !this.props.contracts[this.props.contract].initialized) {
      return (
        <span>Initializing...</span>
      )
    }

    // If the cache key we received earlier isn't in the store yet; the initial value is still being fetched.
    if(!(this.dataKey in this.props.contracts[this.props.contract][this.props.method])) {
        return (
          <span>Fetching...</span>
        )
    }

    var pendingSpinner = this.props.contracts[this.props.contract].synced ? '' : ' 🔄'

    // Optionally hide loading spinner (EX: ERC20 token symbol).
    if (this.props.hideIndicator) {
      pendingSpinner = ''
    }

    var displayData = this.props.contracts[this.props.contract][this.props.method][this.dataKey].value

    // Get account address and balance.
    var balance = displayData;
    // const units = this.props.units ? this.props.units.charAt(0).toUpperCase() + this.props.units.slice(1) : 'Wei'

    if (this.props.correction) {
        balance = balance.slice(0,balance.length - this.props.correction)
    }

    // Convert to given units.
    if (this.props.units) {
      balance = this.context.drizzle.web3.utils.fromWei(balance, this.props.units)
    }

    // Adjust to given precision.
    if (this.props.precision) {
      balance = this.precisionRound(balance, this.props.precision)
    }

    return(
        <span>{balance} {pendingSpinner}</span>
    )
  }
}

BalanceData.contextTypes = {
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

export default drizzleConnect(BalanceData, mapStateToProps)