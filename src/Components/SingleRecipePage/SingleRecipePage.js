import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateRecipe} from '../../ducks/reducer';

class SingleRecipePage extends Component {
    constructor(){
        super()

        this.state = {
            recipe: []
        }
    }

    getRecipes = () => {
        axios.get('/api/recipes').then(res => {
            this.setState({recipe: res.data})
            this.props.updateRecipe(this.state)
        });
      }

    render(){
        const {recipe} = this.props
        return(
            <div>
                <h2>SingleRecipePage</h2>
                <button onClick={() => this.getRecipes()} >get recipe</button>
                {
                this.props.recipe[1] ? 
                <div>
                    <p>{recipe[0].r_name}</p>
                    <p>{recipe[0].servings}</p>
                    <p>{recipe[0].rating}</p>
                    <img src={recipe[0].r_pics[0]} alt='' />
                    
                </div> 
                :
                <div></div>
                }
            </div>
        )
    }
}

function mapStateToProps( state ) {
    return {
        recipe: state.recipe
    }
}

export default connect(mapStateToProps, {updateRecipe})(SingleRecipePage)