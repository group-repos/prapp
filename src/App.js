import React, { Component } from 'react';
import { auth, googleProvider } from './firebase';
import './App.css';
import axios from 'axios';

import Header from './Components/Header';
import routes from './Routes'

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
      <Header />
      <div>
        {routes}
      </div>
      <br></br>
        <button onClick={() => this.getRecipes()}>Get Recipes</button>
        <button onClick={() => this.googleLogin()}>Login with Google</button>
      </div>
    );
  }
}

export default App;
