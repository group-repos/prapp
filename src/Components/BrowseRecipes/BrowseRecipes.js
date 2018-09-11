import React, {Component} from 'react';
import axios from 'axios';

import RecipeCard from '../RecipeCard';
import CalendarDrawer from '../CalendarDrawer/CalendarDrawer';

import './BrowseRecipes.css'

export default class BrowseRecipes extends Component {
  constructor(){
    super()
    this.state = {
      activeCategory: 0,
      recipes: []
    }
  }

  //Gets an array of all recipes, ingredients, and steps in the database.
  componentDidMount() {
      axios.get('/api/getrecipes')
          .then(res => {
              this.setState({recipes: res.data})
          });
  };

  handleClick (i){
    this.setState({
      activeCategory:i
    })
  }

  render(){
    let recipe = this.state.recipes.map((recipe) => (
      <RecipeCard recipe={recipe} key={recipe.r_id}/>
  ))
      return (
          <div className='BrowseRecipes'>
              <div className='categories'>
                {this.props.BrowseRecipesMenu ?   
                  this.props.BrowseRecipesMenu.map((e,i) => {
                    let recipeClasses = this.state.activeCategory === i ? 'ActiveRecipe' : ''
                      return (
                      <p key={i}  
                        onClick={()=> this.handleClick(i)}>{e}<div className={recipeClasses}/>
                      </p>)
                }):''}
              </div>
              <div className='recipeCardsWrapper'>
                {this.state.recipes
                  ? 
                  recipe
                  :
                  <div></div>}
              </div>
          </div>
      )
  }
}