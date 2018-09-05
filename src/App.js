import React, { Component } from 'react';
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

  render() {
    return (
      <div className="App">
      <Header />
      <div>
        {routes}
      </div>
      <br></br>
        <button onClick={() => this.getRecipes()}>Get Recipes</button>
      </div>
    );
  }
}

export default App;
