import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class AddIngredient extends Component {
    state = {
        ingredients: [],
        r_id: '',
        ingredient: '',
        quantity: '',
        unit: ''
    }

    async componentDidMount () {
        await this.setState({r_id: this.props.newRecipe.r_id});
        await this.getIngredients(this.state.r_id);
    }

    componentDidUpdate (prevProps) {
        if (this.props.newRecipe !== prevProps.newRecipe) {
            this.componentDidMount();
        }
    }
    getIngredients = (r_id) => {
        axios.get(`/api/ingredients/${r_id}`)
            .then(res => this.setState({ingredients: res.data}))
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    addIngredient = () => {
        axios.post('/api/ingredients', {r_id: this.state.r_id, ingredient: this.state.ingredient, quantity: this.state.quantity, unit: this.state.unit})
            .then(() => this.componentDidMount())
    }

    render () {
        // console.log(this.state);
        return (
            <div>
                <div>AddIngredient</div>
                <div>
                    <input name='ingredient' onChange={this.handleChange} placeholder='ingredient'/>
                    <input name='quantity' onChange={this.handleChange} placeholder='quantity' type='number'/>
                    <input name='unit' onChange={this.handleChange} placeholder='unit'/>
                    <button onClick={() => this.addIngredient()}>Add Ingredient</button>
                </div>
                {this.state.ingredients[0]
                ?
                <p>{this.state.ingredients.map((ingredient) => (
                    <p key={ingredient.i_id}>{`${ingredient.ingredient}: ${ingredient.quantity} ${ingredient.unit}`}</p>
                ))}</p>
                :
                <p>Add ingredients!</p>}
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