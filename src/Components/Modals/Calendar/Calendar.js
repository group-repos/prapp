import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux'

// Import Images
import logo from '../../../images/LogoWhite.svg'

// Import Action Builder
import {updateCalendar} from '../../../ducks/reducer'

import './Calendar.css';

class Calendar extends Component {
  state = {
      file: '',
      filename: '',
      filetype: '',
      img: '',
      Monday: {day:'Monday',recipes:[]},
      Tuesday: {day:'Tuesday',recipes:[]},
      Wednesday: {day:'Wednesday',recipes:[]},
      Thursday: {day:'Thursday',recipes:[]},
      Friday: {day:'Friday',recipes:[]},
      Saturday: {day:'Saturday',recipes:[]},
      Sunday:{day:'Sunday',recipes:[]},
      weekArr: []
  };

  setDay = async (recipe,day) => {
    await this.setState({
      [day]: {day:this.state[day].day, recipes:[...this.state[day].recipes, recipe]}
    })
    // console.log(this.state[day])
    await this.sendToStore()
  }

  sendToStore(){
    const {
      Monday, 
      Tuesday, 
      Wednesday, 
      Thursday, 
      Friday, 
      Saturday, 
      Sunday} = this.state
    let weekArr = [
      {day:Monday.day,recipes:Monday.recipes}, {day:Tuesday.day,recipes:Tuesday.recipes}, {day:Wednesday.day,recipes:Wednesday.recipes}, 
      {day:Thursday.day,recipes:Thursday.recipes}, 
      {day:Friday.day,recipes:Friday.recipes}, 
      {day:Saturday.day,recipes:Saturday.recipes}, 
      {day:Sunday.day,recipes:Sunday.recipes}]
    // console.log(weekArr)
    this.props.updateCalendar(weekArr)
  }

  render () {
    // console.log('Monday',this.state.Monday)
    // console.log('Tuesday',this.state.Tuesday)
    return (
      <div className='Calendar'>
        <div className='CalendarHeader'>
          <img src={logo} alt=""/>
          <h1>Meal Planner</h1>
          <p>Sept 10 - Sept 16</p>
        </div>
        <div className='CalendarScroller'>
        {/* {console.log('weekArr',this.props.weekArr)} */}
        {this.props.weekArr.map((day,i) => {
          return(
            <div className='CalendarDays' key={i}>
              <h2>{day.day}</h2>
              <hr/>
              <div className='DragonDrop'>
              {/* {console.log('weekArr day',this.state[day.day])} */}

                {this.state[day.day].recipes.map(recipe => (
                  <h2>{recipe.r_name}</h2>
                ))}
              </div>
              <button onClick={() => this.setDay(this.props.recipe,day.day)}>+ </button>
            </div>
          )
        })}
        </div>
      </div>
    )
  };
};

function mapStateToProps(state){
  return{
    recipe: state.recipe,
    weekArr: state.weekArr
  }
}

export default connect(mapStateToProps, {updateCalendar})(Calendar);