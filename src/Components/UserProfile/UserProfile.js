import React, {Component} from 'react';
import UserInfo from '../UserInfo/UserInfo';
import UserSubmittedRecipes from '../UserSubmittedRecipes/UserSubmittedRecipes';
import BrowseRecipes from '../BrowseRecipes/BrowseRecipes';

import './UserProfile.css'
// import Calendar from '../Modals/Calendar/Calendar';

//REDUX
import {connect} from 'react-redux';
import {updateUser} from '../../ducks/reducer';

//TESTS
import {getUserId, getUserEmail, getUserFirstName, getUserLastName, getUserPic} from '../../Logic/logic';


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
                {getUserId(this.props.user.u_id)}
                {getUserEmail(this.props.user.email)}
                {getUserFirstName(this.props.user.first_name)}
                {getUserLastName(this.props.user.last_name)}
                {getUserPic(this.props.user.profile_pic)}
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