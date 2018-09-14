import React, {Component} from 'react';

// import Tutorial from '../Tutorial/Tutorial';
import BrowseRecipes from '../BrowseRecipes/BrowseRecipes';
// import RecipeCard from './RecipeCard';
// import Login from '../Login/Login';
import './Home.css'

//REDUX
import {connect} from 'react-redux';
import {updateModalOpen} from '../../ducks/reducer';

class Home extends Component {
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
                  <button onClick={() => this.props.updateModalOpen('Login')}>Log In</button>
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

export default connect(null, {updateModalOpen})(Home)