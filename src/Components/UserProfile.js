import React, {Component} from 'react';
import Calendar from './Calendar';
import UserInfo from './UserInfo';
import UserSubmittedRecipes from './UserSubmittedRecipes';
import './UserProfile.css'
import BrowseRecipes from './BrowseRecipes';

export default class UserProfile extends Component {
    constructor(){
        super()
        this.state = {
            BrowseRecipesMenu: ["Favorited Recipes", "Ashley's Recipes"]
        }
    }
    render(){
        return (
            <div className='UserWrapper'>
                <header className='UserHeader'>
                    <img src='https://images.unsplash.com/photo-1529932260967-af9d3bbd8138?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b3e872d900875102bc21577a8f6f1345&auto=format&fit=crop&w=634&q=80' alt='' />
                </header>
                <UserInfo />
                <BrowseRecipes BrowseRecipesMenu={ this.state.BrowseRecipesMenu}/>
                <UserSubmittedRecipes />
            </div>
        )
    }
}