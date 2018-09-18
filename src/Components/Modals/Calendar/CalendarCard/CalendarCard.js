import React, { Component } from 'react'

import './CalendarCard.css'

class CalendarCard extends Component {

  render(){
    const {r_name, r_description, servings, rating, r_pics } = this.props.recipe
    return(
      <div>
      {this.props.recipe.r_name
        ?      
        <div className='CalendarCard'>
        <div className='CalendarCardPhotoWrapper'>
          <img src={r_pics} alt=""/>
        </div>
        <div className='CalendarCardContent'>
          <div className='NameDescription'>
            <h2>{r_name}</h2>
            <p>{r_description}</p>
          </div>
          <div className='AddDelete'>
            <button onClick={() => this.props.duplicateRecipe(this.props.recipe.r_id, this.props.recipe.day)}>Duplicate</button>
            <button onClick={() => this.props.deleteFromPlan(this.props.recipe.wr_id)}>Remove</button>
          </div>
        </div>
      </div>
      : <div></div>}
      </div>
      )
  }
}

export default CalendarCard