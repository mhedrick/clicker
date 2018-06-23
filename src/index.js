import React, {Fragment} from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  initialState = {
    seconds: 0,
    seconders: 0
  };
  state = {};
  componentWillMount() {
    let savegame = JSON.parse(localStorage.getItem("save"));
    if (savegame && typeof savegame.seconds != "undefined") {
      this.setState(savegame);
    } else {
      this.setState(this.initialState);
    }
  }
  componentDidMount(){
    //start global tick
    this.tick();
  }
  seconderCost() {
    return Math.floor(10 * Math.pow(1.1, this.state.seconders));
  }
  buySeconder(){
    if(this.seconderCost() <= this.state.seconds){
      this.setState({seconders: this.state.seconders + 1, seconds: this.state.seconds - this.seconderCost()});
    }
  }
  addSeconds(seconds = 1){
    this.setState({ seconds: this.state.seconds + seconds })
  }
  tick(){
    // time until next second
    // won't drift with time
    const nextSecond = 1000 - Date.now() % 1000
    this.timer = setTimeout(this.tick.bind(this), nextSecond)

    this.addSeconds(this.state.seconders || 1);
  }
  save() {
    // todo: polyfill this once everythings in a set STATE (get it)
    localStorage.setItem('save', JSON.stringify(this.state));
  }
  unsave() {
    // todo: polyfill this once everythings in a set STATE (get it)
    localStorage.removeItem('save', JSON.stringify(this.state));
    this.setState(this.initialState);
  }
  render() {
    return (
    <Fragment>
      <button onClick={this.addSeconds.bind(this, 1)}>add 1 second</button>
      <br />
      <button onClick={this.buySeconder.bind(this, 1)} disabled={this.seconderCost() > this.state.seconds}>buy 1 seconder for {this.seconderCost()} seconds</button>
      <br />
      <button onClick={this.save.bind(this)}>save game</button>
      <br />
      <button onClick={this.unsave.bind(this)}>delete save</button>
      <div>you have: {this.state.seconds} seconds</div>
      <div>you have: {this.state.seconders} seconders</div>
    </Fragment>);
  }
}

var mountNode = document.getElementById("root");
ReactDOM.render(<App/>, mountNode);