import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux'

// Import Images
import logo from '../../../images/LogoWhite.svg'

// Import Components
import CalendarCard from './CalendarCard/CalendarCard'

//CSS
import './Calendar.css';

class Calendar extends Component {
  state = {
    weeklyPlan: [],
  }

  componentDidMount() {
    this.getWeeklyPlan();
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.weeklyPlan !== prevState.weeklyPlan) {
      this.setState({weeklyPlan: this.state.weeklyPlan})
    }
  }

  getWeeklyPlan = () => {
    axios.post('/api/weeklyplan', {u_id: this.props.user.u_id})
      .then(res => this.setState({weeklyPlan: res.data}));
  }

  addToPlan = (day) => {
    axios.post('/api/addtoplan', {u_id: this.props.user.u_id, r_id: this.props.recipe.r_id, day: day})
      .then(() => this.getWeeklyPlan());
  }

  deleteFromPlan = (wr_id) => {
    axios.delete(`/api/weeklyplan/${wr_id}`)
      .then(() => this.getWeeklyPlan());
  }

  duplicateRecipe = (r_id, day) => {
    axios.post('/api/addtoplan', {u_id: this.props.user.u_id, r_id: r_id, day: day})
      .then(() => this.getWeeklyPlan());
  }

  render () {
    // console.log('weeklyPlan', this.state.weeklyPlan);
    return (
      <div className='Calendar'>
        <div className='CalendarHeader'>
          <img src={logo} alt=""/>
          <h1>Meal Planner</h1>
          <p>Sept 10 - Sept 16</p>
        </div>
        <div className='CalendarScroller'>
        {this.state.weeklyPlan.map((day,i) => {
          return(
            <div className='CalendarDays' key={i}>
              <h2>{day[0].day}</h2>
              <hr/>
              <div className='DragonDrop'>
                {day.map((recipe, i) => (
                  recipe.r_name ? 
                  <CalendarCard
                    key={recipe.wr_id}
                    recipe={recipe}
                    deleteFromPlan={this.deleteFromPlan}
                    duplicateRecipe={this.duplicateRecipe}
                    /> : ''
                ))}
              </div>
              <button onClick={() => this.addToPlan(day[0].day)}>+ {day[0].day}</button>
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
    user: state.user
  }
}

export default connect(mapStateToProps)(Calendar);