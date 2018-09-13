import React, {Component} from 'react';

// import Tutorial from '../Tutorial/Tutorial';
import BrowseRecipes from '../BrowseRecipes/BrowseRecipes';
// import RecipeCard from './RecipeCard';
// import Login from '../Login/Login';
import './Home.css'

export default class Home extends Component {
  constructor(){
      super()

      this.state = {
        recipeMenu: ['Keto', 'Breakfast', 'Bananas']
      }
  }
  render(){
      return (
          <div>
              <div className='LandingPage'>
                <div className='WordsDiv'>
                  <h1>Meal Planning</h1>
                  <h2>Made Simple</h2>
                  <br></br>
                  <br></br>
                  <button>Learn More</button>
                </div>
              </div>
              <BrowseRecipes BrowseRecipesMenu={this.state.recipeMenu}/>
              <div className='recipeCardsWrapper' >
                      
              </div>
              {/* <RecipeCard /> */}
          </div>
      )
  }
}