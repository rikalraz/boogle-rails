import React from "react"
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux'

import configureStore from '../configureStore'
const store = configureStore();

import Game from './Game';
import '../App.css';

class App extends React.Component {
  render () {
    return (
      <BrowserRouter>
        <div className="container">
          <div className="header">
            <h1 className="logo-wrap" >Boggle Game</h1>
          </div>
          <Game />
        </div>
      </BrowserRouter>
    );
  }
}

export default App