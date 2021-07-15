import React, { Component } from 'react';
import './App.css';
import List from "./components/List"
import Context from "./components/Context";
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      age: 20
    }
  }
  render() {
    const {age} = this.state;
    return (
      <Context.Provider  >
        <div className="App">
          app-age {age}
          <button onClick={() => this.setState({age: age + 1})}>add</button>
          <List></List>
        </div>
      </Context.Provider>
    );
  }
}

export default App;
