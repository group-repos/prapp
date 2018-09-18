import React from 'react';
// import { mailFolderListItems, otherMailFolderListItems } from './tileData';
import hamburgerImage from '../../images/hamburger.svg';
import {Link} from 'react-router-dom';
import './NavDrawer.css';

//IMAGES
import Icon1 from '../../images/Asset 1.svg';
import Icon2 from '../../images/Asset 2.svg';
import Icon3 from '../../images/Asset 3.svg';
import Icon5 from '../../images/Asset 5.svg';
import fbIcon from '../../images/Facebook.svg';
import instagramIcon from '../../images/Instagram.svg';
import twitterIcon from '../../images/Twitter.svg';
import profilePic from '../../images/alexandru-zdrobau-98438-unsplash.jpg'

//MATERIAL-UI
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';
// import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import LogOut from '@material-ui/icons/ExitToApp';

//REDUX
import {connect} from 'react-redux';
import {updateUser, updateModalOpen} from '../../ducks/reducer';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

const materialUiTheme = createMuiTheme({
  overrides: {
    MuiMenuItem: {
      root: {
        color: 'white',
      }
    }
  }
})

const home = props => <Link to='/' {...props}></Link>
const recipe = props => <Link to='/recipe' {...props}></Link>
const about = props => <Link to='/about' {...props}></Link>
const contact = props => <Link to='/contact' {...props}></Link>

class NavDrawer extends React.Component {
  state = {
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const {user} = this.props
    return (
      <div>
        <button onClick={this.toggleDrawer('right', true)} className='hamburger'>
          <img src={hamburgerImage} alt='' />
        </button>

        <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
          <div
            className='NavDrawer'
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('right', false)}
            onKeyDown={this.toggleDrawer('right', false)}
          >
            { user.first_name ?
            <Link to='/profile'>
              <div className='NavDrawerProfile'>
                <div className='ProfilePicWrapper'>
                  <img src={user.profile_pic} alt=""/>
                </div>
                <div className='UserInfoContainer'>
                  <h3>{user.first_name} {user.last_name}</h3>
                  <p>{user.username}</p>
                  <Button type='text' >
                    <LogOut style={{color: '#666'}} />
                  </Button>
                </div>
              </div>
            </Link>
            :
            <button onClick={() => this.props.updateModalOpen('Login')} >Log In</button>
            }

            <div className='MenuItems'>
              <MuiThemeProvider theme={materialUiTheme}>
                <MenuItem component={home}><img src={Icon1} alt='' style={{width: '35px'}} />Home</MenuItem>
                <MenuItem component={recipe}><img src={Icon5} alt='' style={{width: '35px'}} />Browse Recipes</MenuItem>
                <MenuItem component={about}><img src={Icon2} alt='' style={{width: '35px'}} />About</MenuItem>
                <MenuItem component={contact}><img src={Icon3} alt='' style={{width: '35px'}} />Contact</MenuItem>
              </MuiThemeProvider>
            </div>
          
            <div className='Footer'>
              <hr/>
              <div className='FooterIcons'>
                <img src={fbIcon} alt='' style={{width: '20px'}} />
                <img src={twitterIcon} alt='' style={{width: '20px'}} />
                <img src={instagramIcon} alt='' style={{width: '20px'}} />
              </div>
              <div className='FooterLegal'>
                <p className='Copyright'>© ThatWasLegitness, Inc</p>
                <p className='PrivacyPolicy'>All rights reserved. <a href=''>Privacy Policy</a></p>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

NavDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps, {updateUser, updateModalOpen})(NavDrawer));