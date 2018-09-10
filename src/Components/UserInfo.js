import React, {Component} from 'react';
import './UserInfo.css'
import toast from '../images/calum-lewis-390145-unsplash.jpg'

export default class UserInfo extends Component {
  render(){
      return (
          <div className='UserProfileWrapper' >
              <div className='ProfileLeft' >
                  <div className='PhotoWrapper'>
                      <img src='https://images.unsplash.com/photo-1529932260967-af9d3bbd8138?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b3e872d900875102bc21577a8f6f1345&auto=format&fit=crop&w=634&q=80' alt='' />
                  </div>
                  <div className='UserData'>
                      <h3>About</h3>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                      <hr />
                      <div className='horizontalFlex' >
                          <p>Recipes</p>
                          <span><p>24</p></span>
                      </div>
                      <div className='UserButtons'>
                          <button id='ProfileButton'>Weekly Meal Plan</button> 
                          <button id='ProfileButton'>Shopping List</button>
                      </div>
                  </div>
              </div>
              <div className='ProfileRight'>
                <h1>Ashley Rogers</h1>
                <p>@TrinaBernstein</p>
                <div className='plannedMeals'>
                    <div className='plannedMealsImg'>
                      <img src={toast} alt=""/>
                    </div>
                    <div className='PlannedMealsRight'>
                      <h2><div className='SmallH2Bar'/>Today's Meal</h2>
                      <hr/>
                      <h3>Berry Tasty Fruity Flavor Lemonade</h3>
                      <p>Woke hoodie raclette literally selfies. Air plant man bun pok pok ramps la croix. Man bun hashtag next level kickstarter.</p>
                      <p>Servings: 2 Individuals</p>
                      <button id='ProfileButton'>Go to Recipe</button>
                    </div>
                </div>
              </div>
          </div>
      )
  }
}