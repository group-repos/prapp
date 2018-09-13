import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import './SingleRecipe.css'

class SingleRecipePage extends Component {
  constructor(){
    super()

    this.state = {
      recipe: [],
      loading: true
    }
  }

  componentDidMount(){
    axios.get('/api/recipe').then(res => {
      this.setState({
        recipe: res.data,
        loading: false
      })
    });
  }

  render(){
    console.log(this.state.recipe[1])
    const recipe = this.state.recipe[0]
    return(
      <div className='SingleRecipePage'>
        {this.state.loading ? <div></div> : 
        // Conditional Render for ComponentDidMount//
          <div className='SingleRecipe'>
            <div className='SingleRecipePhotoWrapper'>
              <img src={recipe.r_pics} alt=""/>
            </div>
            <div className='SingleRecipeContent'>
              <h1><div className='SmallH1Bar'/>{recipe.r_name}</h1>
              <p>{recipe.r_description}</p>
              <div className='FlexRow'>
                <div className='FlexList'>
                  <h2>Ingredients</h2>
                  {this.state.recipe[1].map(e => {
                    return(<p>{e.quantity} {e.unit} of {e.ingredient}</p>)
                  })}
                </div>
                <div className='FlexList'>
                  <h2>Steps</h2>
                  {this.state.recipe[2].map(e => {
                    return(
                      <p>{e.description}</p>
                      )
                    })}
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
}
}

export default SingleRecipePage