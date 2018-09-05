import React, { Component } from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import './App.css';

import axios from 'axios';

class App extends Component {

  componentDidMount () {
    axios.get('/api/user').then((res) => console.log('res.data',res.data))
  }

  getRecipes = () => {
    axios.get('/api/recipes').then(res => console.log('recipes', res.data));
  }

  render() {
    return (
      <div className="App">
      <h1>Home Component</h1>
      <HashRouter>
        <Switch>
          <Route />
          <Route />
          <Route />
        </Switch>
      </HashRouter>
        <button onClick={() => this.getRecipes()}>Get Recipes</button>
      </div>
    );
  }
}

export default App;
