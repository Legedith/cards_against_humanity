import openSocket from "socket.io-client";
import React, { Component } from "react";
import "./App.css";
const io = openSocket("http://localhost:80");
// import { hot } from "react-hot-loader";


class App extends Component {
  render() {
  // const socket = io('http://localhost:80');
  io.on('connect', () => {
    io.send('hi');

    io.on('message', (msg) => {
      console.log(msg);
    });
  });
    return (
      <div className="buttons">
        <label className = "welcome">
          Welcome
        </label>
        <label className = "title">
          Cards Against Humanity Online
        </label>
        
        <div className = "buttons">
        <form>
        <input
          type="text"
          placeholder = "Username" />
        </form>
        <button 
          className = "join"
          type = "submit"
          variant="primary">
          Join a room
        </button>
        <button 
          className = "create"
          type = "submit"
          variant="primary">
          Create a room
        </button>
        </div>
      </div>
    );
  }
}

export default App;