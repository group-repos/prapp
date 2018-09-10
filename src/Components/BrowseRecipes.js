import React, {Component} from 'react';
import axios from 'axios';

import RecipeCard from './RecipeCard';
import CalendarDrawer from './CalendarDrawer';

export default class BrowseRecipes extends Component {
    constructor() {
        super();
        this.state = {
            recipes: []
        };
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