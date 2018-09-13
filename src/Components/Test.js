import React, { Component } from 'react';
// import axios from 'axios';

import Login from './Login/Login';
import AddRecipe from './Modals/AddRecipe/AddRecipe';
import AddIngredients from './Modals/AddIngredients/AddIngredients';
import AddSteps from './Modals/AddSteps/AddSteps';

class Test extends Component {
    state = {

    }

    render () {
        return (
            <div style={{marginTop: '100px'}}>
                <div>Test</div>
                <Login />
                <AddRecipe />
                <AddIngredients />
                <AddSteps />
            </div>
        )
    }
}

export default Test;