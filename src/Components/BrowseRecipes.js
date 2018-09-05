import React, {Component} from 'react';

import CalendarDrawer from './CalendarDrawer';

export default class BrowseRecipes extends Component {
    render(){
        return (
            <div>
                <h2>BrowseRecipes</h2>
                <CalendarDrawer />
            </div>
        )
    }
}