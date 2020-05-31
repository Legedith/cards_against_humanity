import openSocket from "socket.io-client";
import React, { Component } from "react";
import "./App.css";
const socket = openSocket("http://localhost:80");
// import { hot } from "react-hot-loader";

let setComponent;
let leader = false;
let NewSetRecv;
var blackTextInside;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      cards: [],
      sets: [],
      currentSet: null,
      url : "https://cards-against-humanity-api.herokuapp.com/sets/",
      IdOfSocket: socket.id,
      clientNum:0,
      blackCardInfo: "",

    };
  }
  dataGetter()
  {
    console.log(this.state.url)
    console.log(this.state.currentSet)
    if (this.state.url === "https://cards-against-humanity-api.herokuapp.com/sets/"){
      fetch(this.state.url)
      .then(res => res.json())
      .then(
        (result) => {this.setState({
            isLoaded: true,
            sets: result
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
        });
    }
    else{
      fetch(this.state.url)
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
  }
  componentDidMount() {
    this.dataGetter();
    
  }
  render() {
    socket.on("NewSet", (data) => {
      NewSetRecv = data;
      console.log(data);
      this.setState(
          { currentSet : NewSetRecv,
            isLoaded: false,
            url : "https://cards-against-humanity-api.herokuapp.com/sets/"+NewSetRecv,
          }
        ,() => { 
          console.log(this.state.currentSet + "insidne the freaking feunfnerfnin");
          this.dataGetter();
      });
    });
    // var data = "hello";
    // socket.broadcast.emit('broadcast', 'hello friends! Im here');
    socket.on('colorInfo', function(data) {
      if (data.color === 'black')
      {
        console.log("Setting the node black");
        leader = true;
        // this.setState({
        //   clientNum: data.clients
        // },() => {
        //   console.log(leader);
        // });
      }
    });
    socket.on('BlackUpdated',(data) => {
      blackTextInside = data;
    });
  // const socket = io('http://localhost:80');
  // io.on('br', () => {
  //   io.send('hi');

  //   io.on('message', (msg) => {
  //     console.log(msg);
  //   });
  // });
  // var socket = io();
  // var socket = io();
  // socket.on('newclientconnect',function(data) {
  //   //  document.body.innerHTML = '';
  //   //  document.write(data.description);
  //   console.log(data.description);
    
  // });
  if (this.state.currentSet){
    let blacktext = "";
    let warr = [];
    let wcd;
    let placed = false;
    let rand;
    if (this.state.isLoaded === true){
      placed = true;
      if (leader)
      {
        let bcd = this.state.cards.blackCards; 
        rand = Math.floor(Math.random() * bcd.length);
        blacktext = bcd[rand].text;
        socket.emit("BlackUpdate",blacktext);
        console.log("Sending black info");
      }
      else
      {
        blacktext =  blackTextInside;
        console.log(blacktext + "This is the text that should be shown inside the black box")
      }
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
    if (leader)
    {
      setComponent = <div>
        <div className="Tile">
          <div class="Black-card">
            {placed ? blacktext: 'Loading...'}
          </div>
        </div>
      </div>
    }
    else
    {
      setComponent = <div>
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
      </div>;
    }
    
  }
  else{
    if (leader)
    {
      let placed = false;
      let listItem;
      if (this.state.isLoaded === true){
        placed = true;
        // console.log(this.state.sets[1].setName);
        listItem = this.state.sets.map(
          x => 
          <div className="Set" key={x.setName} onClick={() => {this.setState({
            url : "https://cards-against-humanity-api.herokuapp.com/sets/"+x.setName,
            isLoaded: false,
            currentSet:  x.setName,
            
          }, () => {
            console.log("Set name is :"+x.setName);
            this.dataGetter();
            socket.emit("SetChange",x.setName);
          }) ;
          
            }}> {x.setName} </div>
        ) 
      }
      setComponent = <div className="Tile">{listItem}</div>;
    }
    else if (!this.state.currentSet)
    {
      setComponent = <h3>Please wait whilt leader chooses a card set!</h3>
    } 
  }
    return (
      <div className="App">
        {setComponent}
      </div>
    );
  }
}

export default App;