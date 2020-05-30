import React from 'react';
// import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      cards: []
    };
  }

  componentDidMount() {
    fetch("https://cards-against-humanity-api.herokuapp.com/sets/Base")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            cards: result
          });
          // console.log(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  render()
  {
    let blacktext = "";
    let warr = [];
    let wcd;
    let placed = false;
    if (this.state.isLoaded === true){
      placed = true;
      let bcd = this.state.cards.blackCards; 
      let rand = Math.floor(Math.random() * bcd.length);
      blacktext = bcd[rand].text;
      // console.log(rand);
      // console.log(bcd[rand].text);
      wcd = this.state.cards.whiteCards;
      // console.log(wcd);

      while (warr.length !== 6)
      {
        rand = Math.floor(Math.random() * wcd.length);
        if (!warr.includes(rand))
        {
          warr.push(rand);
        }
      }
    // console.log("The type: "+ typeof bcd[0])
      
    }

    return ( 
      <div className="App">
        <div className="Tile">
          <div class="Black-card">
            {placed ? blacktext: 'Loading...'}
          </div>
        </div>
        <div className="Tile">
          <div class="White-card">
            {placed ? wcd[warr[0]]: 'Loading...'}
          </div>
          <div class="White-card">
           {placed ? wcd[warr[1]]: 'Loading...'}
          </div>
          <div class="White-card">
            {placed ? wcd[warr[2]]: 'Loading...'}
          </div>
        </div>
        <div className="Tile">
          <div class="White-card">
           {placed ? wcd[warr[3]]: 'Loading...'}
          </div>
          <div class="White-card">
           {placed ? wcd[warr[4]]: 'Loading...'}
          </div>
          <div class="White-card">
            {placed ? wcd[warr[5]]: 'Loading...'}
          </div>
        </div>
      </div>

    );
  }
}
export default App;
