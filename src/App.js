import React, { Component } from 'react';
import { auth, googleProvider, facebookProvider } from './firebase';
import './reset.css'
import './App.css';
import axios from 'axios';

// import _ from 'lodash';

import Header from './Components/Header/Header';
import routes from './Routes';

class App extends Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
      steps: [],
      ingredients: []
    }
  }

  //Gets all recipes, ingredients, and steps from the database
  componentDidMount () {
    axios.get('/api/getrecipes').then(res => this.setState({
      recipes: res.data
    }));
  }

  //Gets one recipe from the database
  getRecipes = () => {
    axios.get('/api/recipe').then(res => console.log('recipes', res.data));
  }

  //Google Auth
  googleLogin = () => {
   auth.signInWithPopup(googleProvider)
    .then(result => {
      console.log('user', result.user.uid);
    })
    .catch(err => {
      console.log(err);
    })
  }

  //Facebook Auth
  facebookLogin = () => {
    auth.signInWithPopup(facebookProvider)
      .then(res => {
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
      {routes}
      </div>
    );
  }
}

export default App;
