import React, { Component } from 'react';
import { auth, googleProvider, facebookProvider } from './firebase';
import './App.css';
import axios from 'axios';

import Header from './Components/Header';
import routes from './Routes'

class App extends Component {

  // componentDidMount () {
  //   axios.get('/api/user').then((res) => console.log('res.data',res.data))
  // }

  getRecipes = () => {
    axios.get('/api/recipes').then(res => console.log('recipes', res.data));
  }

  googleLogin = () => {
   auth.signInWithPopup(googleProvider)
    .then(result => {
      console.log('user', result.user.uid);
    })
    .catch(err => {
      console.log(err);
    })
  }

  facebookLogin = () => {
    auth.signInWithPopup(facebookProvider)
      .then(res => {
        // var token = res.credential.accessToken;
        // console.log('token', token);
        var user = res.user;
        console.log('user', user);
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className="App">
      <Header />
      <div>
        {routes}
      </div>
      <br></br>
        <button onClick={() => this.getRecipes()}>Get Recipes</button>
        <button onClick={() => this.googleLogin()}>Login with Google</button>
        <button onClick={() => this.facebookLogin()}>Login with Facebook</button>
      </div>
    );
  }
}

export default App;
