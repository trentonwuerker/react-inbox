import React, { Component } from 'react';
import './index.css';
import Toolbar from './components/Toolbar'
import Messages from './components/Messages'
import data from './db/seeds'

class App extends Component {
  render() {
    return (
      <div>
        <Toolbar />
        <Messages data={data}/>
      </div>
    );
  }
}

export default App;
