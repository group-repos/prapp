import React, {Component} from 'react';

// import Tutorial from '../Tutorial/Tutorial';
import BrowseRecipes from '../BrowseRecipes/BrowseRecipes';
// import RecipeCard from './RecipeCard';
import Login from '../Login/Login';

export default class Home extends Component {
    constructor(){
        super()

        this.state = {
            
        }
    }
    render(){
        
        return (
            <div>
                <div className='LandingPage' >
                    <div className='WordsDiv'>
                        <p>Meal Planning</p>
                        <p>Made Simple</p>
                        <br></br>
                        <br></br>
                        <button>Learn More</button>
                    </div>
                </div>
                <Login />
                <BrowseRecipes />
                <div className='recipeCardsWrapper' >
                        
                </div>
                {/* <RecipeCard /> */}
            </div>
        )
    }
}