import React from 'react';
// import { mailFolderListItems, otherMailFolderListItems } from './tileData';
import hamburgerImage from '../../images/hamburger.png';
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

//MATERIAL-UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';
// import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

const home = props => <Link to='/' {...props}></Link>
const recipe = props => <Link to='/recipe' {...props}></Link>
const profile = props => <Link to='/profile' {...props}></Link>
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
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        {/* <List>{mailFolderListItems}</List> */}
        <Divider />
        {/* <List>{otherMailFolderListItems}</List> */}
      </div>
    );

    return (
      <div>
        <IconButton onClick={this.toggleDrawer('right', true)} >
          <img className='hamburger' src={hamburgerImage} alt='' />
        </IconButton>

        <Drawer anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('right', false)}
            onKeyDown={this.toggleDrawer('right', false)}
          >
            <div>
              <IconButton color='secondary' component={profile} ></IconButton>
              <h3>First Last</h3>
              <p>@username</p>
            </div>
            <hr></hr>
            {/* {sideList} */}
            <MenuItem component={home}><img src={Icon1} alt='' style={{width: '35px'}} />Home</MenuItem>
            <MenuItem component={recipe}><img src={Icon5} alt='' style={{width: '35px'}} />Browse Recipes</MenuItem>
            <MenuItem component={about}><img src={Icon2} alt='' style={{width: '35px'}} />About</MenuItem>
            <MenuItem component={contact}><img src={Icon3} alt='' style={{width: '35px'}} />Contact</MenuItem>
          </div>
          <hr></hr>
          <div>
            <img src={fbIcon} alt='' style={{width: '20px'}} />
            <img src={twitterIcon} alt='' style={{width: '20px'}} />
            <img src={instagramIcon} alt='' style={{width: '20px'}} />
          </div>
          <div>
            <p>© ThatWasLegitness, Inc</p>
            <p>All rights reserved. Privacy Policy</p>
          </div>
        </Drawer>
      </div>
    );
  }
}

NavDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavDrawer);