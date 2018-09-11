import React, {Component} from 'react';

import NavBar from '../Navbar/NavBar';
// import NavDrawer from '../NavDrawer/NavDrawer';

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