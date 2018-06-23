import React, {Fragment} from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  state = {
    elapsedTime: null,
    seconders: 0
  };
  seconderCost() {
    return Math.floor(10 * Math.pow(1.1, this.state.seconders));
  }
  render() {
    return (
    <Fragment>
      <button onClick={this.addSeconds.bind(this, 1)}>add 1 second</button>
      <br />
      <button onClick={this.buySeconder.bind(this, 1)} disabled={this.seconderCost() > this.state.elapsedTime}>buy 1 seconder for {this.seconderCost()} seconds</button>
      <div>you have: {this.state.elapsedTime} seconds</div>
      <div>you have: {this.state.seconders} seconders</div>
    </Fragment>);
  }
  buySeconder(){
    if(this.seconderCost() <= this.state.elapsedTime){
      this.setState({seconders: this.state.seconders + 1, elapsedTime: this.state.elapsedTime - this.seconderCost()});
    }
  }
  addSeconds(seconds = 1){
    this.setState({ elapsedTime: this.state.elapsedTime + seconds })
  }
  tick(){
    // time until next second
    // won't drift with time
    const nextSecond = 1000 - Date.now() % 1000
    this.timer = setTimeout(this.tick.bind(this), nextSecond)

    this.addSeconds(this.state.seconders || 1);
  }
  componentDidMount(){
    //start global tick
    this.tick();
  }
}

var mountNode = document.getElementById("root");
ReactDOM.render(<App/>, mountNode);