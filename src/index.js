import React, {Fragment} from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  initialState = {
    game: {
      power: 0,
      readers: 0
    }
  };
  state = {};
  componentWillMount() {
    let savegame = JSON.parse(localStorage.getItem("save"));
    if (savegame && typeof savegame.power != "undefined") {
      this.setState({ lastUpdate: Date.now(), lastSave: Date.now(), game: savegame});
    } else {
      this.setState({ lastUpdate: Date.now(), lastSave: Date.now(), ...this.initialState});
    }
  }
  componentDidMount(){
    //start global tick
    this.tick();
  }
  readerCost() {
    return Math.floor(10 * Math.pow(1.35, this.state.game.readers));
  }
  buypower(){
    if(this.readerCost() <= this.state.game.power){
      this.setState({game: {readers: this.state.game.readers + 1, power: this.state.game.power - this.readerCost()}});
    }
  }
  addpower(power = 1){
    let game = {...this.state.game};
    game.power = this.state.game.power + power;
    this.setState({ game })
  }
  tick(){
    let thisUpdate = Date.now();
    // find the seconds since the last update
    let delta = Math.round((thisUpdate - this.state.lastUpdate) / 1000);
    // force updates to only happen in second intervals, nothing faster
    if (delta < 1){
        delta = 1;
    }
    const nextSecond = 1000 - thisUpdate % 1000
    this.timer = setTimeout(this.tick.bind(this), nextSecond * delta);
    this.addpower((this.state.game.readers * .1 + 1) * delta);

    this.setState({ lastUpdate: Date.now()});
  }
  save() {
    // todo: polyfill this once everythings in a set STATE (get it)
    this.setState({lastSave: Date.now()}, () => localStorage.setItem('save', JSON.stringify(this.state.game)));
  }
  unsave() {
    // todo: polyfill this once everythings in a set STATE (get it)
    localStorage.removeItem('save');
    this.setState({ lastUpdate: Date.now(), lastSave: Date.now(), game: this.initialState });
  }
  render() {
    return (
    <Fragment>
      <button onClick={this.addpower.bind(this, 1)}>add 1 power</button>
      <br />
      <button onClick={this.buypower.bind(this, 1)} disabled={this.readerCost() > this.state.game.power}>split 1 reader for {this.readerCost()} power</button>
      <br />
      <button onClick={this.save.bind(this)}>save game</button>
      <br />
      <button onClick={this.unsave.bind(this)}>delete save</button>
      {/* on real display, prettify */}
      <div>you have: {this.state.game.power} power</div>
      <div>you have: {this.state.game.readers} readers</div>
    </Fragment>);
  }
}

var mountNode = document.getElementById("root");
ReactDOM.render(<App/>, mountNode);