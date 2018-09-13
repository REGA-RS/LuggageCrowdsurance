import React, { Component } from 'react';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Uploader extends Component {

  constructor(props, context) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);

    this.contracts = context.drizzle.contracts;

    // Get the contract ABI
    const abi = this.contracts[this.props.contract].abi;

    this.inputs = [];
    this.extension = {};
    this.error_msg = '';
    var initialState = {};

    this.dataKey = this.contracts['LCSToken'].methods['getCurrentTokenId'].cacheCall(...[]);

    // Iterate over abi for correct function.
    for (var k = 0; k < abi.length; k++) {
        if (abi[k].name === 'getCurrentTokenId') {
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

  handleSubmit() {
    var name = this.state['name'];
    var surname = this.state['surname'];
    var email = this.state['email'];
    var PIRNumber = this.state['PIRNumber'];
    var PIRDate = this.state['PIRDate'];
    var file = this.state['file'];
    var file1 = this.state['file-1'];
    var file2 = this.state['file-2'];
    var hash = this.context.drizzle.web3.utils.sha3(name.concat(surname));

    const data = new FormData();

    if(file && hash) {
      this.contracts[this.props.contract].methods[this.props.method].cacheSend(...[]);
      data.append(hash, file);
      data.append(`${hash}-1`, file1);
      data.append(`${hash}-2`, file2);
      data.append('name', name);
      data.append('surname', surname);
      data.append('email', email);
      data.append('PIRNumber', PIRNumber);
      data.append('PIRDate', PIRDate);
      
      axios.post('https://rega.life/lexi/luggage', data).then((response) => {
        console.log(file);
        this.setState({
          imageUrl: response.data.fileUrl
        });
      });
    }
    else {
      this.error_msg = hash;
    }
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  // Component method
  handleFileUpload(event) {
    this.setState({ 'file': event.target.files[0]});
    this.setState({ 'file-1': event.target.files[1]});
    this.setState({ 'file-2': event.target.files[2]});
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
    return (
      <form className="pure-form pure-form-stacked">
        {this.error_msg.length > 0 &&
            <h3>
                ERROR: need to select file to upload 
            </h3>
        }
        <p>{this.error_msg}</p>
        {this.props.extension.map((input, index) => {
            return (<input key={input.name} type={input.type} name={input.name} value={this.state[input.name]} placeholder={input.name} onChange={this.handleInputChange} />)
        })}
        <h3>Upload claim docs: boarding pass, luggage ticket and RIP</h3>
        <input type="file" onChange={this.handleFileUpload} multiple/>
        <button key="submit" className="pure-button" type="button" onClick={this.handleSubmit}>Submit</button>
      </form>
    )
  }
}

Uploader.contextTypes = {
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

export default drizzleConnect(Uploader, mapStateToProps)