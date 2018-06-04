import { drizzleConnect } from 'drizzle-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

/*
 * Create component.
 */

class ContractFormExtension extends Component {
  constructor(props, context) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.contracts = context.drizzle.contracts;

    // Get the contract ABI
    const abi = this.contracts[this.props.contract].abi;

    this.inputs = [];
    this.extension = {};
    this.error_msg = '';
    var initialState = {};

    this.dataKey = this.contracts['LCSToken'].methods['getHash'].cacheCall(...[]);

    // Iterate over abi for correct function.
    for (var k = 0; k < abi.length; k++) {
        if (abi[k].name === 'getBizProcessId') {
            this.fnABI = abi[k];
  
            break;
        }
    }

    // Iterate over abi for correct function.
    for (var i = 0; i < abi.length; i++) {
        if (abi[i].name === this.props.method) {
            this.inputs = abi[i].inputs;

            for (var j = 0; j < this.inputs.length; j++) {
                initialState[this.inputs[j].name] = '';
            }

            break;
        }
    }

    this.state = initialState;
  }

  checkFileExists(url) {
    axios.get(url).then((response) => {
        console.log(url);
        return url;
      }).catch(function (error) {
        console.log(error);
        return ``;
      });
  }

  emitEvent(url) {
    axios.post(url).then((response) => {
        console.log(url);
        return url;
      }).catch(function (error) {
        console.log(error);
        return ``;
      });
  }

  handleSubmit() {
    
    if(this.props.emitEvent) {
        this.contracts[this.props.contract].methods[this.props.method].cacheSend(...[]);
        var eventUrl = `https://rega.life/lexi/luggage/${this.props.emitEvent}`;
        return this.emitEvent(eventUrl);
    }

    var name = this.state['Name'];
    var surname = this.state['Surname'];
    var hash = this.context.drizzle.web3.utils.sha3(name.concat(surname));
    var displayData = this.props.contracts['LCSToken']['getHash'][this.dataKey].value;
    if(this.props.check) {
        if(hash === displayData) {
            this.contracts[this.props.contract].methods[this.props.method].cacheSend(...[]);
        }
        else {
            this.error_msg = hash;
        }
    }
    else {
        this.contracts[this.props.contract].methods[this.props.method].cacheSend(...[hash]);
    }
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  translateType(type) {
    switch(true) {
        case /^uint/.test(type):
            return 'number';
        
        case /^string/.test(type) || /^bytes/.test(type):
            return 'text';
           
        case /^bool/.test(type):
            return 'checkbox';
            
        default:
            return 'text';
    }
  }

  render() {
    if(!this.props.contracts['LCSToken'].initialized) {
        return (
          <span>Initializing...</span>
        )
      }
  
      // If the cache key we received earlier isn't in the store yet; the initial value is still being fetched.
      if(!(this.dataKey in this.props.contracts['LCSToken']['getHash'])) {
        return (
          <span>Fetching...</span>
        )
      }
  
    var displayData = this.props.contracts['LCSToken']['getHash'][this.dataKey].value;
    // var imgUrl = `/files/${displayData}`;
    var imgUrl = `https://rega.life/lexi/luggage/${displayData}`;
    
    return (
      <form className="pure-form pure-form-stacked">
        {this.props.check &&
            <h3>Claim docs</h3> &&
            <img alt="vote-img" src={imgUrl} />
        }
        {this.error_msg.length > 0 &&
            <h3>
                ERROR: the hash does not match 
            </h3>
        }
        <p>{this.error_msg}</p>
        {this.props.extension.map((input, index) => {
            return (<input key={input.name} type={input.type} name={input.name} value={this.state[input.name]} placeholder={input.name} onChange={this.handleInputChange} />)
        })}
        <button key="submit" className="pure-button" type="button" onClick={this.handleSubmit}>Submit</button>
      </form>
    )
  }
}

ContractFormExtension.contextTypes = {
  drizzle: PropTypes.object
}

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    contracts: state.contracts
  }
}

export default drizzleConnect(ContractFormExtension, mapStateToProps)