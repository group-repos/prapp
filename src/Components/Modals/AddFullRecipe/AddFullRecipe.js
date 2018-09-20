import React, { Component } from 'react';


// CSS
import './AddFullRecipe.css'
import AddRecipe from '../AddRecipe/AddRecipe';
import AddIngredients from '../AddIngredients/AddIngredients';
import AddSteps from '../AddSteps/AddSteps';

class AddFullRecipe extends Component {
    state = {       
        
    }

    render () {
        return (
        <div className='ModalSwitcher'>
          <div className='AddSwitcher'>
            <AddRecipe />
          </div>
          <div className='IngredientsSwitcher'>
            <AddIngredients/>
          </div>
          <div className='StepsSwitcher'>
            <AddSteps/>
          </div>
        </div>
        )
    }
}

export default AddFullRecipe;