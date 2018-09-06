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
            <div key={i} style={{height: '100px', width: '200px', backgroundColor: 'blue', marginTop: '10px'}} >
                <RecipeCard num={num} />
            </div>
        ))
        return (
            <div>
                <h1>Home Component</h1>
                <Tutorial />
                <BrowseRecipes />
                <Contact />
                {/* <RecipeCard /> */}
                <div>{recipeDisplay}</div>
            </div>
        )
    }
}