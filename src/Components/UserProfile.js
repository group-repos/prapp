import React, {Component} from 'react';
import Calendar from './Calendar';
import UserInfo from './UserInfo';
import UserSubmittedRecipes from './UserSubmittedRecipes';

export default class UserProfile extends Component {
    render(){
        return (
            <div>
                <h1>UserProfile</h1>
                <Calendar />
                <UserInfo />
                <UserSubmittedRecipes />
            </div>
        )
    }
}