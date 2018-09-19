import React, {Component} from 'react';
import UserInfo from '../UserInfo/UserInfo';
import UserSubmittedRecipes from '../UserSubmittedRecipes/UserSubmittedRecipes';
import BrowseRecipes from '../BrowseRecipes/BrowseRecipes';

import './UserProfile.css'
import Calendar from '../Modals/Calendar/Calendar';

//REDUX
import {connect} from 'react-redux';
import {updateUser} from '../../ducks/reducer';


class UserProfile extends Component {
    constructor(){
        super()
        this.state = {
            BrowseRecipesMenu: ["Favorited Recipes", "Ashley's Recipes"]
        }
    }
    render(){
        const {user} = this.props
        return (
            <div className='UserWrapper'>
                <header className='UserHeader'>
                    <img src={user.profile_pic} alt='' />
                </header>
                <UserInfo />
                {/* <Calendar /> */}
                <BrowseRecipes BrowseRecipesMenu={ this.state.BrowseRecipesMenu}/>
                <UserSubmittedRecipes />
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {updateUser})(UserProfile);