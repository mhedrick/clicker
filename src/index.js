import React, {Component, Fragment} from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk';
import rootReducer from './_reducers';
import { addPower, buyPower } from './_actions/game';
import { save, unsave, load } from './_actions/engine';

const store = createStore(rootReducer, applyMiddleware(thunk));

class App extends Component {
  componentWillMount() {
    this.props.load();
  }
  componentDidMount(){
    //start global tick
    this.tick();
  }
  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log(error, info);
  }
  readerCost() { 
    return Math.floor(10 * Math.pow(1.35, this.props.game.readers));
  }
  tick(){
    let thisUpdate = Date.now();
    // find the seconds since the last update
    let delta = Math.round((thisUpdate - this.props.engine.lastUpdate) / 1000);
    // force updates to only happen in second intervals, nothing faster
    if (delta < 1){
        delta = 1;
    }
    const nextSecond = 1000 - thisUpdate % 1000
    this.timer = setTimeout(this.tick.bind(this), nextSecond);
    this.props.onAddPower((this.props.game.readers * .1 + 1) * delta);
  }
  render() {
    return (
    <Fragment>
      <button onClick={this.props.onAddClick}>add 1 power</button>
      <br />
      <button onClick={this.props.onBuyClick} disabled={this.readerCost() > this.props.game.power}>split 1 reader for {this.readerCost()} power</button>
      <br />
      <button onClick={this.props.onSaveClick}>save game</button>
      <br />
      <button onClick={this.props.onDeleteClick}>delete save</button>
      {/* on real display, prettify */}
      <div>you have: {this.props.game.power.toFixed(2)} power</div>
      <div>you have: {this.props.game.readers} readers</div>
    </Fragment>);
  }
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => ({
    load: () => dispatch(load()),
    onBuyClick: () => dispatch(buyPower(1)),
    onAddPower: (amount) => dispatch(addPower(amount)),
    onAddClick: () => dispatch(addPower(1)),
    onSaveClick: () => dispatch(save()),
    onDeleteClick: () => dispatch(unsave())
  });

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

var mountNode = document.getElementById("root");
ReactDOM.render(<Provider store = {store}><ConnectedApp/></Provider>, mountNode);