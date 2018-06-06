import { drizzleConnect } from 'drizzle-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
 * Create component.
 */

class ProgressBar extends Component {
  constructor(props, context) {
    super(props);

    this.bizProcess = [
      {name:"Apply", id:1, visible:["done","current","goal"]},
      {name:"Wait", id:2, visible:["current"]},
      {name:"Approve", id:3, visible:["done","current","goal"]},
      {name:"Join", id:4, visible:["done","current","goal"] },
      {name:"Activate", id:10, visible:["done","current","goal"]},
      {name:"Claim", id:11, visible:["done","current","goal"]},
      {name:"Wait", id:20, visible:["current"]},
      {name:"Receive", id:21, visible:["goal"]},
      {name:"Approved", id:21, visible:["current"]},
      {name:"Receive", id:22, visible:["current"]},
      {name:"Rejected", id:23, visible:["current"]},
    ];

    this.bizProgress = {
      0: {style:{width: "350px"}, max:6, value:6, description:"Complited"},
      1: {style:{width: "350px"}, max:6, value:1, description:"Make a application"},
      2: {style:{width: "380px"}, max:7, value:2, description:"Wait for the application approval"},
      3: {style:{width: "350px"}, max:6, value:2, description:"Provide an allowance to LCS for RST transfer"},
      4: {style:{width: "350px"}, max:6, value:3, description:"Join to crowdsurance"},
      5: {style:{width: "350px"}, max:6, value:5, description:"Vote for the claim"},
      10: {style:{width: "350px"}, max:6, value:4, description:"Activate crowdsurance token"},
      11: {style:{width: "350px"}, max:6, value:5, description:"Make a claim"},
      20: {style:{width: "380px"}, max:7, value:6, description:"Wait for the claim approval"},
      21: {style:{width: "350px"}, max:6, value:6, description:"Collect claim payment"},
      22: {style:{width: "350px"}, max:6, value:6, description:"Collect join amount"},
      23: {style:{width: "350px"}, max:6, value:6, description:"Claim is rejected"},
    };
  }

  getProgressStyle() {
    const { bizProcessId } = this.props;
    const staticStyle = {
      borderRadius: "2px",
      height: "20px",
    };
    const style = {...this.bizProgress[bizProcessId].style, ...staticStyle };
    return style;
  }
  getProgressMax() {
    const { bizProcessId } = this.props;
    return this.bizProgress[bizProcessId].max;
  }
  getProgressValue() {
    const { bizProcessId } = this.props;
    return this.bizProgress[bizProcessId].value;
  }
  getDescription() {
    const { bizProcessId } = this.props;
    return this.bizProgress[bizProcessId].description;
  }
  getBizProcess() {
    const bizProcess = this.bizProcess.map((stage, i) => {

      const { bizProcessId } = this.props;
      const done = stage.id < bizProcessId && stage.visible.includes("done");
      const current = stage.id == bizProcessId && stage.visible.includes("current");
      const goal = stage.id > bizProcessId && stage.visible.includes("goal");

      if(done) {
        return(<span key={i}><strong>&nbsp;{stage.name}&nbsp;</strong></span>)
      } else if(current) {
        return(<span key={i}><strong>&nbsp;{stage.name}<sup>*</sup>&nbsp;</strong></span>) 
      } else if(goal) {
        return(<span key={i}>&nbsp;{stage.name}&nbsp;</span>)
      }
      return(null)
    });

    return bizProcess;
  }

  render() {

    return(
    <div>
      <div>
        {this.getBizProcess()}
      </div>
      <div>
        <progress max={this.getProgressMax()} value={this.getProgressValue()} style={this.getProgressStyle()}></progress>
      </div>
      <div>
        {this.getDescription()}
      </div>
    </div>
    );
  }
}

ProgressBar.contextTypes = {
  drizzle: PropTypes.object
}

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {    
  }
}

export default drizzleConnect(ProgressBar, mapStateToProps)