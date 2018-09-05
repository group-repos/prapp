import React, { Component } from 'react';
import { auth, googleProvider } from './firebase';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';

class App extends Component {

  componentDidMount () {
    axios.get('/api/user').then((res) => console.log('res.data',res.data))
  }

  getRecipes = () => {
    axios.get('/api/recipes').then(res => console.log('recipes', res.data));
  }

  googleLogin = () => {
   auth.signInWithPopup(googleProvider)
    .then(result => {
      console.log('user', result.user);
    })
    .catch(err => {
      console.log(err);
    })
  }
 

  render() {
    console.log(process.env.REACT_APP_FBASE_AUTH_DOMAIN);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Our Group Project</h1>
          <h1 className="App-title">SHUT UP RICHARD!</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <input placeholder='Gimme dat numbah'/>
        </p>
        <button onClick={() => this.getRecipes()}>Get Recipes</button>
        <button onClick={() => this.googleLogin()}>Login with Google</button>
      </div>
    );
  }
}

export default App;
