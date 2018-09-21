import React, {Component} from 'react';
import axios from 'axios';

//REDUX
import {connect} from 'react-redux';

//TESTS
// import {getRecipe} from '../../Logic/logic';

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
    axios.post('/api/recipe', {r_id: this.props.recipe.r_id}).then(res => {
      this.setState({
        recipe: res.data,
        loading: false
      })
    });
  }

  render(){
    // console.log(this.state.recipe[1])
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
                    return(<p key={e.i_id} >{e.quantity} {e.unit} of {e.ingredient}</p>)
                  })}
                </div>
                <div className='FlexList'>
                  <h2>Steps</h2>
                  {this.state.recipe[2].map(e => {
                    return(
                      <p key={e.s_id}>{e.description}</p>
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

function mapStateToProps(state) {
  return {
    recipe: state.recipe
  }
}

export default connect(mapStateToProps)(SingleRecipePage)