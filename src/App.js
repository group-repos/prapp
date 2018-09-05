import React, { Component } from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import axios from 'axios';

import Header from './Components/Header';
import Home from './Components/Home';
import SingleRecipePage from './Components/SingleRecipePage';
import UserProfile from './Components/UserProfile';

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
      <Header />
      <br></br>
      <HashRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/recipe' component={SingleRecipePage} />
          <Route path='/profile' component={UserProfile} />
        </Switch>
      </HashRouter>
        <button onClick={() => this.getRecipes()}>Get Recipes</button>
      </div>
    );
  }
}

export default App;
