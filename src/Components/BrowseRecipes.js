import React, {Component} from 'react';
import axios from 'axios';

import RecipeCard from './RecipeCard';
import CalendarDrawer from './CalendarDrawer';

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

    render(){
        console.table(this.state.recipes);
        let recipe = this.state.recipes.map((recipe) => (
            <div key={recipe.r_id}>
                <RecipeCard recipe={recipe}/>
            </div>
        ))
        return (
            <div>
                <div className='categories' >
                    <p>Freezer Meals</p>
                    <p>Breakfast</p>
                    <p>Chicken</p>
                    <p>Keto</p>
                </div>
                {this.state.recipes
                ? 
                <div>{recipe}</div>
                :
                <div></div>}
                <CalendarDrawer />
            </div>
        )
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