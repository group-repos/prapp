import React, { Component } from 'react'

import './CalendarCard.css'

class CalendarCard extends Component {

  render(){
    const {r_name, r_description, servings, rating, r_pics } = this.props.recipe
    return(
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
            <button>Duplicate</button>
            <button onClick={() => this.props.deleteRecipeFn(this.props.day.day, this.props.calendarCardId)}>Remove</button>
          </div>
        </div>
      </div>
      )
  }
}

export default CalendarCard