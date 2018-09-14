import React, { Component } from 'react';
// import axios from 'axios';

import Login from './Login/Login';
import AddRecipe from './Modals/AddRecipe/AddRecipe';
import AddIngredients from './Modals/AddIngredients/AddIngredients';
import Calendar from './Modals/Calendar/Calendar';
import BrowseRecipes from './BrowseRecipes/BrowseRecipes'

class Test extends Component {
    state = {

    }

    render () {
        return (
            <div style={{marginTop: '50px'}}>
                <Calendar />
                <BrowseRecipes />
                {/* <AddRecipe /> */}
                {/* <AddIngredients /> */}
            </div>
        )
    }
}

export default Test;