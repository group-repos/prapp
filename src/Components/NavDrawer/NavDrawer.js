import React from 'react';
// import { mailFolderListItems, otherMailFolderListItems } from './tileData';
import hamburgerImage from '../../images/hamburger.png';
import {Link} from 'react-router-dom';

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
            {sideList}
            <MenuItem component={home} >Home</MenuItem>
            <MenuItem component={recipe} >Browse Recipes</MenuItem>
            <MenuItem component={about} >About</MenuItem>
            <MenuItem component={contact} >Contact</MenuItem>
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