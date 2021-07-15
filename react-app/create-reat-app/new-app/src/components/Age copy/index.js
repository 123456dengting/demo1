import React, { Component } from 'react';
import Context from "../Context";

export default class Age extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  componentDidMount(){
    console.log(111111, this.context, this.props);
  }

  render() {
    return (
        <Context.Consumer>
          {age => (<div className="age">
            age {age}
        </div>)}
      </Context.Consumer>
    );
  }
}

// Age.contextType = Context;