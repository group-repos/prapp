import React, {Component} from 'react';

import './RecipeCard.css'

import favoriteIcon from '../../images/Asset6.svg'
import addRecipeIcon from '../../images/Asset8.svg'
import editRecipeIcon from '../../images/Asset7.svg'


class RecipeCard extends Component {
constructor(){
    super()
    this.state = {
        hover:false,
        tags: ['drinks', 'breakfast', 'chicken', 'lunch', 'keto', 'tag', 'food']
    }
}
handleHover(){
    this.setState({
        hover: !this.state.hover
    })
}

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
    let RecipePhotoWrapperClass = this.state.hover ? 'RecipePhotoWrapper RecipePhotoWrapperHover' : 'RecipePhotoWrapper'
    let RecipeQuickViewClass = this.state.hover ? 'recipeQuickView recipeQuickViewHover' : 'recipeQuickView'
    let cardMenuClass = this.state.hover ? 'cardMenu cardMenuHover' : 'cardMenu'
    return(
        <div className='RecipeCards' 
            onMouseEnter={() => this.handleHover()} 
            onMouseLeave={() => this.handleHover()}>
            <div className={RecipePhotoWrapperClass}>
                <img src={this.props.recipe.r_pics} alt=""/>
            </div>
            <div className={RecipeQuickViewClass}>
                <div className={cardMenuClass}>
                    <img src={editRecipeIcon} alt=""/>
                    <img src={addRecipeIcon} alt=""/>
                    <div className='favoriteCounter'>
                        <img src={favoriteIcon} alt=""/>
                        <p>{this.props.recipe.rating}</p>
                    </div>
                </div>
                <div className='quickViewContent'>
                    <h2>{this.props.recipe.r_name}</h2>
                    <p>{this.props.recipe.r_description}</p>
                    <p><span>Servings:</span> {this.props.recipe.servings} individuals</p>
                </div>
                <div className='cardTags'>
                {this.state.tags.map((e, i) => {
                    return(
                    <p key={i}>{e}</p>
                    )
                })}
                </div>
            </div>
        </div>
    )
}
}

export default RecipeCard