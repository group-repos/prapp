import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux'

// Import Images
import logo from '../../../images/LogoWhite.svg'

// Import Action Builder
import {updateCalendar} from '../../../ducks/reducer'

// Import Components
import CalendarCard from './CalendarCard/CalendarCard'

//CSS
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
      weekArr: [],
      u_id: ''
  };

  componentDidMount() {
    axios.post('/api/weeklyplan', {u_id: this.props.user.u_id})
      .then(res => this.props.updateCalendar(res.data));
  }

  componentDidUpdate (prevProps) {
    if (this.props.weekArr !== prevProps.weekArr) {
      this.setState({
        weekArr: this.props.weekArr,
        Monday: this.props.weekArr[0],
        Tuesday: this.props.weekArr[1],
        Wednesday: this.props.weekArr[2],
        Thursday: this.props.weekArr[3],
        Friday: this.props.weekArr[4],
        Saturday: this.props.weekArr[5],
        Sunday: this.props.weekArr[6]
      });
    }
  }

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
      {day:Monday.day,recipes:Monday.recipes},
      {day:Tuesday.day,recipes:Tuesday.recipes},
      {day:Wednesday.day,recipes:Wednesday.recipes}, 
      {day:Thursday.day,recipes:Thursday.recipes}, 
      {day:Friday.day,recipes:Friday.recipes}, 
      {day:Saturday.day,recipes:Saturday.recipes}, 
      {day:Sunday.day,recipes:Sunday.recipes}]
    // console.log(weekArr)
    this.sendToDB(weekArr)
  }

  sendToDB = (weekArr) => {
    axios.post('/api/weeklyrecipe', {weekly_string: weekArr})
      .then(res => this.props.updateCalendar(res.data));
  }

  getOneWeeklyRecipe = () => {
    axios.post('/api/weeklyplan', {u_id: 6})
      .then(res => console.log(res.data));
  }

  deleteRecipe = (day, id) => {
    console.log('day',day, 'id',id)
    
  }

  render () {
    let count = 0
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
        {this.state.weekArr.map((day,i) => {
          return(
            <div className='CalendarDays' key={i}>
              <h2>{day.day}</h2>
              <hr/>
              <div className='DragonDrop'>
              {/* {console.log('weekArr day',this.state[day.day])} */}

                {this.state[day.day].recipes.map((recipe,i) => {
                  let calendarCardId = count += 1
                  // console.log(day.day,calendarCardId)
                  return (
                  <CalendarCard 
                    recipe={recipe} 
                    key={calendarCardId} 
                    deleteRecipeFn={this.deleteRecipe}
                    day={this.state[day.day]}
                    calendarCardId={calendarCardId}/>
                  )
                })}
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
    weekArr: state.weekArr,
    user: state.user
  }
}

export default connect(mapStateToProps, {updateCalendar})(Calendar);