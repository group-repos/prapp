import React, {Component} from 'react';

import RecipeCard from './RecipeCard';
import CalendarDrawer from './CalendarDrawer';

import './BrowseRecipes.css'

export default class BrowseRecipes extends Component {
  constructor(){
    super()
    this.state = {
      activeCategory: 0
    }
  }

  handleClick (i){
    this.setState({
      activeCategory:i
    })
  }

  render(){
      return (
          <div>
              <div className='categories'>
                {this.props.BrowseRecipesMenu ?   
                  this.props.BrowseRecipesMenu.map((e,i) => {
                    let recipeClasses = this.state.activeCategory === i ? 'ActiveRecipe' : ''
                      return (
                      <p key={i} 
                        className={recipeClasses} 
                        onClick={()=> this.handleClick(i)}>{e}
                      </p>)
                }):''}
              </div>
              <RecipeCard />
              <CalendarDrawer />
          </div>
      )
  }
}