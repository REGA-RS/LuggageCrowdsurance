import { drizzleConnect } from 'drizzle-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

/*
 * Create component.
 */

class ApplyForm extends Component {
  constructor(props, context) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.contracts = context.drizzle.contracts;

    // Get the contract ABI
    const abi = this.contracts[this.props.contract].abi;

    this.inputs = [];
    var initialState = {};

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

    initialState['option'] = 'RST';

    this.state = initialState;
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

    if(this.props.setOption) {
      this.props.setOption(this.state['option']);
    }

    var sendObject = Object.assign({}, this.state);
    delete sendObject['option'];

    if(this.props.emitEvent) {
      var eventUrl = `https://rega.life/lexi/luggage/${this.props.emitEvent}`;
      this.emitEvent(eventUrl);
    }

    return this.contracts[this.props.contract].methods[this.props.method].cacheSend(...Object.values(sendObject));
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log(`Event name ${event.target.name} value ${event.target.value}`);
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
        {this.inputs.map((input, index) => {            
            var inputType = this.translateType(input.type)
            var inputLabel = this.props.labels ? this.props.labels[index] : input.name
            // check if input type is struct and if so loop out struct fields as well
            return (<input key={input.name} type={inputType} name={input.name} value={this.state[input.name]} placeholder={inputLabel} onChange={this.handleInputChange} />)
        })}
        <button key="submit" className="pure-button" type="button" onClick={this.handleSubmit}>Submit</button>
      </form>
    )
  }
}

ApplyForm.contextTypes = {
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

export default drizzleConnect(ApplyForm, mapStateToProps)