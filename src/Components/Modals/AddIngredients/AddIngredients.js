import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

// CSS
import './AddIngredients.css' 

//TESTS
import { getNewRecipe, getNewRecipeId, getNewRecipeName, getNewRecipeDescription, getNewRecipeServings } from '../../../Logic/logic';

class AddIngredient extends Component {
    state = {
        ingredients: [],
        r_id: '',
        ingredient: '',
        quantity: '',
        unit: ''
    }

    // async componentDidMount () {
    //     await this.setState({r_id: this.props.newRecipe.r_id});
    //     await this.getIngredients(this.state.r_id);
    // }

    componentDidUpdate (prevProps, prevState) {
        if (this.props.newRecipe !== prevProps.newRecipe) {
            this.setState({r_id: this.props.newRecipe.r_id})
        }
        if (this.state.ingredients !== prevState.ingredients) {
            this.setState({ingredients: this.state.ingredients})
        }
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    
    getIngredients = () => {
        axios.post(`/api/ingredients`, {r_id: this.state.r_id})
            .then(res => {
                console.log(res.data)
                this.setState({ingredients: res.data})
            })
    }

    addIngredient = () => {
        axios.post('/api/ingredient', {r_id: this.state.r_id, ingredient: this.state.ingredient, quantity: this.state.quantity, unit: this.state.unit})
        .then(() => {
            this.getIngredients();
        })
    }
    
    render () {
        console.log(this.state);
        let ingredientsList = this.state.ingredients.map(e => (
                <p key={e.i_id}>{`${e.ingredient}: ${e.quantity} ${e.unit}`}</p>
        ))
        return (
            <div className='AddIngredients'>
                {getNewRecipe(this.props.newRecipe)}  
                {getNewRecipeId(this.props.newRecipe.r_id)}
                {getNewRecipeName(this.props.newRecipe.r_name)}
                {getNewRecipeDescription(this.props.newRecipe.r_description)}
                {getNewRecipeServings(this.props.newRecipe.servings)}
                <div>AddIngredient</div>
                <div>
                    <input name='ingredient' onChange={this.handleChange} placeholder='ingredient'/>
                    <input name='quantity' onChange={this.handleChange} placeholder='quantity' type='number'/>
                    <input name='unit' onChange={this.handleChange} placeholder='unit'/>
                    <button onClick={() => this.addIngredient()}>Add Ingredient</button>
                </div>
                {this.state.ingredients[0]
                ?
                <div>{ingredientsList}</div>
                :
                <p>Add ingredients!</p>}
                <button onClick={() => this.props.classSwitcher('ModalThree')}>Next</button>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        newRecipe: state.newRecipe
    }
}

export default connect(mapStateToProps)(AddIngredient);