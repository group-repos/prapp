import React, { Component } from 'react';
// import axios from 'axios';

import AddRecipe from './Modals/AddRecipe/AddRecipe';
import AddIngredients from './Modals/AddIngredients/AddIngredients';
import AddSteps from './Modals/AddSteps/AddSteps';

class Test extends Component {
    state = {

    }

    render () {
        return (
            <div style={{marginTop: '100px', border:'1px solid black'}}>
                {/* <Login /> */}
                <AddRecipe />
                <AddIngredients />
                <AddSteps />
            </div>
        )
    }
}

export default Test;