import React, { Component } from 'react';


// CSS
import './AddFullRecipe.css'

import AddRecipe from '../AddRecipe/AddRecipe';
import AddIngredients from '../AddIngredients/AddIngredients';
import AddSteps from '../AddSteps/AddSteps';

class AddFullRecipe extends Component {
  constructor(){
    super()
    this.state = {       
        modalNo: 'ModalOne'
    }
  }

    classSwitcher = (modalNo) => {
      this.setState({
        modalNo: modalNo
      })
    }

    render () {
        return (
        <div className='ModalSwitcher'>
          <div className={`AddSwitcher-${this.state.modalNo}`}>
            <AddRecipe classSwitcher={this.classSwitcher}/>
          </div>
          <div className={`IngredientsSwitcher-${this.state.modalNo}`}>
            <AddIngredients classSwitcher={this.classSwitcher}/>
          </div>
          <div className={`StepsSwitcher-${this.state.modalNo}`}>
            <AddSteps classSwitcher={this.classSwitcher}/>
          </div>
        </div>
        )
    }
}

export default AddFullRecipe;