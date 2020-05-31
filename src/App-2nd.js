import React, { Component } from "react";
// import { hot } from "react-hot-loader";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="buttons">
        <label className = "welcome">
          Welcome
        </label>
        <label className = "title">
          Cards Against Humanity Online
        </label>
        
        <div className = "buttons">
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
        <form>
        <input
          type="text"
          placeholder = "Username" />
        </form>
        </div>
      </div>
    );
  }
}

export default App;