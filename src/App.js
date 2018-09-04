import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';

class App extends Component {

  componentDidMount () {
    axios.get('/api/user').then((res) => console.log('res.data',res.data))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
<<<<<<< HEAD
          <h1 className="App-title">Welcome to Our Changed Group Project</h1>
          <h1 className="App-title">You'll shoot your eye out, kid</h1>
=======
          <h1 className="App-title">Welcome to Our Group Project</h1>
          <h1 className="App-title">SHUT UP RICHARD!</h1>
>>>>>>> 589b6fe73eeeab918e92106e51fb726ee3fbd362
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <input placeholder='Gimme dat numbah'/>
        </p>
      </div>
    );
  }
}

export default App;
