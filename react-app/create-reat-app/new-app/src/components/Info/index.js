import React, { Component } from 'react';
import Age from "../Age"

export default class Info extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  render() {
    const {age} = this.props;
    return (
      <div className="info">
          Info container
          <p>name</p>
          <Age />
          
      </div>
    );
  }
}

