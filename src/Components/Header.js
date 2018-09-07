import React, {Component} from 'react';

import NavBar from './NavBar';
import NavDrawer from './NavDrawer';

export default class Header extends Component {
    render(){
        return (
            <div>
                <NavBar />
                {/* <NavDrawer /> */}
            </div>
        )
    }
}