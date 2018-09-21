import React, {Component} from 'react';
import './UserInfo.css'
import toast from '../../images/calum-lewis-390145-unsplash.jpg'

//REDUX
import {connect} from 'react-redux';
import {updateUser, updateModalOpen} from '../../ducks/reducer';

class UserInfo extends Component {
  render(){
      const {user} = this.props
      return (
          <div className='UserProfileWrapper' >
              <div className='ProfileLeft' >
                  <div className='PhotoWrapper'>
                      <img src={user.profile_pic} alt='' />
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
                          <button id='ProfileButton' onClick={()=>this.props.updateModalOpen('Calendar')}>Weekly Meal Plan</button> 
                          <button id='ProfileButton' onClick={()=>this.props.updateModalOpen('ShoppingList')}>Shopping List</button>
                      </div>
                  </div>
              </div>
              <div className='ProfileRight'>
                <h1>{user.first_name} {user.last_name}</h1>
                <p>{user.username}</p>
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

function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {updateUser, updateModalOpen})(UserInfo);