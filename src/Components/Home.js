import React, {Component} from 'react';

import Header from './Header';
import Tutorial from './Tutorial';
import BrowseRecipes from './BrowseRecipes';
import Contact from './Contact';
import RecipeCard from './RecipeCard';

export default class Home extends Component {
    render(){
        return (
            <div>
                <h1>Home Component</h1>
                <Header />
                <Tutorial />
                <BrowseRecipes />
                <Contact />
                <RecipeCard />
            </div>
        )
    }
}