import React, {Component} from 'react';

class RecipeCard extends Component {
    render(){
        let { ingredients, steps } = this.props.recipe;
        let ingredient = ingredients.map((ingredient) => (
            <div className='recipe-card__ingredient' key={ingredient.id}>
                <p>{`${ingredient.ingredient}: ${ingredient.quantity} ${ingredient.unit}`}</p>
            </div>
        ))
        let step = steps.reverse().map(step => (
            <div className='recipe-card__step' key={step.id}>
                <p>{`Step ${step.step}: ${step.description}`}</p>
            </div>
        ))
        return(
            <div>
                <h2>{this.props.recipe.r_name}</h2>
                <h4>Ingredients:</h4>
                <div>{ingredient}</div>
                <h4>Steps:</h4>
                <div>{step}</div>
            </div>
        )
    }
}

export default RecipeCard