import React, { Component } from 'react';
import Info from "../Info"

export default class List extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  render() {
    const {age} = this.props;
    return (
      <div className="list">
          list container
          <p>list 1</p>
          <p>list 2</p>
          <Info />
      </div>
    );
  }
}
