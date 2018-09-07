import React, {Component} from 'react';

import RecipeCard from './RecipeCard';
import CalendarDrawer from './CalendarDrawer';

export default class BrowseRecipes extends Component {
    render(){
        return (
            <div>
                <div className='categories' >
                    <p>Freezer Meals</p>
                    <p>Breakfast</p>
                    <p>Chicken</p>
                    <p>Keto</p>
                </div>
                <RecipeCard />
                <CalendarDrawer />
            </div>
        )
    }
}