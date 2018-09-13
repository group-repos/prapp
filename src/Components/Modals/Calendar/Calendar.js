import React, { Component } from 'react';
import axios from 'axios';

import './Calendar.css';

class Calendar extends Component {
  state = {
      file: '',
      filename: '',
      filetype: '',
      img: '',
      weekdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  };

  render () {

    return (
      <div className='Calendar'>
        <div className='CalendarHeader'>
          <img src="" alt=""/>
          <h1>Meal Planner</h1>
          <p>Sept 10 - Sept 16</p>
        </div>
        <div className='CalendarScroller'>
        {this.state.weekdays.map(day => {
          return(
            <div className='CalendarDays'>
              <h2>{day}</h2>
              <hr/>
              <button>+ {day}</button>
            </div>
          )
        })}
        </div>
      </div>
    )
  };
};

export default Calendar;