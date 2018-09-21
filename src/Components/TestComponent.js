import React, { Component } from 'react';
// import axios from 'axios';

// import AddRecipe from './Modals/AddRecipe/AddRecipe';
// import AddIngredients from './Modals/AddIngredients/AddIngredients';
// import Calendar from './Modals/Calendar/Calendar';
// import BrowseRecipes from './BrowseRecipes/BrowseRecipes';
// import ShoppingList from './ShoppingList/ShoppingList';
// import AddIngredients from './Modals/AddIngredients/AddIngredients';
import AddSteps from './Modals/AddSteps/AddSteps';
import AddFullRecipe from './Modals/AddFullRecipe/AddFullRecipe';

class Test extends Component {
    state = {

    }

    render () {
        return (
            <div style={{marginTop: '50px'}}>
                <AddFullRecipe/>
                {/* <AddIngredients />
                <br></br>
                <br></br>
                <br></br> */}
                <AddSteps />
                <br></br>
                <br></br>
                <br></br>
                {/* <ShoppingList/> */}
                {/* <Calendar />
                {/* <BrowseRecipes /> */}
                {/* <AddRecipe /> */}
                {/* <AddIngredients /> */}
            </div>
        )
    }
}

export default Test;