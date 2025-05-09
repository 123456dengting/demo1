import "./App.css";

import React, { Component } from "react";

import logo from "./logo.svg";
import img1 from "./images/img1.jpg";

class App extends Component {
  componentDidMount() {
    console.log('哈哈哈~ 服务器渲染成功了！');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={img1} alt="img1" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
