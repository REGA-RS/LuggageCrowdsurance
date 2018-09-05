import { drizzleConnect } from 'drizzle-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

/*
 * Create component.
 */

class MsgForm extends Component {
  constructor(props, context) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    var initialState = {};

    this.state = initialState;
  }

  handleSubmit() {

    const eventUrl = `https://rega.life/lexi/luggage/message`;
    const data = new FormData();

    data.append('email', this.state["email"]);
    data.append('subject', this.state["subject"]);
    data.append('message', this.state["message"]);
    
    axios.post(eventUrl, data).then((response) => {
        console.log(response);
      }).catch(function (error) {
        console.log(error);
      });
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <form className="pure-form pure-form-stacked">
        <input key="email" type="text" name="email" value={this.state["email"]} placeholder="EMail" onChange={this.handleInputChange} />
        <input key="subject" type="text" name="subject" value={this.state["subject"]} placeholder="Subject" onChange={this.handleInputChange} />
        <input key="message" type="text" name="message" value={this.state["message"]} placeholder="Message" onChange={this.handleInputChange} />
        <button key="submit" className="pure-button" type="button" onClick={this.handleSubmit}>Submit</button>
      </form>
    )
  }
}

MsgForm.contextTypes = {
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

export default drizzleConnect(MsgForm, mapStateToProps)