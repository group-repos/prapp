import React, {Component} from 'react';

import Tutorial from './Tutorial';
import BrowseRecipes from './BrowseRecipes';
import Contact from './Contact';
import RecipeCard from './RecipeCard';

export default class Home extends Component {
    constructor(){
        super()

        this.state = {
            testArr: [1,2,3,4,5,6,7,8,9,10]
        }
    }
    render(){
        let recipeDisplay = this.state.testArr.map((num, i) => (
            <div className='recipeCards' key={i} 
            // style={{height: '100px', width: '200px', backgroundColor: 'blue', marginTop: '10px'}} 
            >
                <RecipeCard num={num} />
            </div>
        ))
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
                <BrowseRecipes />
                <div className='recipeCardsWrapper' >
                        {recipeDisplay}
                </div>
                <Contact />
                {/* <RecipeCard /> */}
            </div>
        )
    }
}