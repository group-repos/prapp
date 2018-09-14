import React, {Component} from 'react';
import NavDrawer from '../NavDrawer/NavDrawer';
import Logo from '../../images/Logo.svg'
import magnifyingGlass from '../../images/magnifyingGlass.svg'


//MATERIAL-UI
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

import './NavBar.css';

let inputField = <TextField 
    type='search' 
    placeholder='Search...' 
    color='default' />

export default class NavBar extends Component {
    constructor() {
        super()

        this.state = {
            show: false
        }
    }

    handleToggle(){
        this.setState(prevState => ({
            show: !prevState.show
        }))
    }

    render() {
        let searchWrapperClass = this.state.show ? 'searchWrapper': 'searchWrapper searchWrapperTransform'
    return (
            <nav>
                <div className='LogoWrapper'>
                    {/* <img src={Logo} alt=""/> */}
                    <h1>PR<span>APP</span></h1>
                </div>
                <div className='RightSide'>
                    <div className='searchWrapperHidden'>
                        <div className={searchWrapperClass}>
                            <IconButton
                                style={{marginRight: '10px'}}
                                onClick={() => this.handleToggle()}
                                >
                                <img src={magnifyingGlass} alt='' style={{width: '23px'}}></img>
                            </IconButton>
                            {inputField}
                            {/* {this.state.show ? inputField: false} */}
                        </div>
                    </div>
                <NavDrawer />
                </div>
            </nav>
    )
}
}