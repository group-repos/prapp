import React, { Component } from 'react';
// import axios from 'axios';

import Login from './Login/Login';
import AddRecipe from './Modals/AddRecipe/AddRecipe';
import AddIngredients from './Modals/AddIngredients/AddIngredients';

class Test extends Component {
    state = {

    }

    render () {
        return (
            <div style={{marginTop: '100px', border:'1px solid black'}}>
                <Login />
                {/* <AddRecipe /> */}
                {/* <AddIngredients /> */}
            </div>
        )
    }
}

export default Test;