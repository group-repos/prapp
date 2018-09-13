import React from 'react';
import './Contact.css';
import PropTypes from 'prop-types';

//MATERIAL UI
import purple from '@material-ui/core/colors/purple';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import {  } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '45%',
  },
  menu: {
    width: 200,
  },
  cssLabel: {
      '&$cssFocused': {
          color: purple[500]
      }
  },
  cssFocused: {},
  cssUnderline: {
      '&:after': {
          borderBottomColor: purple[500]
      }
  }
});

const materialUiTheme = createMuiTheme({
    palette: {
        primary: {main: '#0071BC'},
        // secondary: {main: '#FF0040'}
    }
})


class Contact extends React.Component {
  state = {
    name: 'Cat in the Hat',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
        <div className='wrapper'>
            <div className='title'>
                <h1>Contact</h1>
            </div>
            <div>
                <MuiThemeProvider theme={materialUiTheme}>
                <form className={classes.container} noValidate autoComplete="off" action='https://formspree.io/spencer.ricks9@gmail.com' method='POST'>
                    <TextField
                    name='Name'
                    required
                    id="required"
                    label="Name"
                    //   defaultValue="Hello World"
                    className={classes.textField}
                    margin="normal"
                    />
                    <TextField
                    name='Email'
                    required
                    id="required"
                    label="Email"
                    //   defaultValue="Hello World"
                    className={classes.textField}
                    margin="normal"
                    />
                    <TextField
                    name='Message'
                    id="full-width"
                    // className={classes.textField}
                    label="Type message here..."
                    multiline
                    required
                    rows='4'
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    margin="normal"
                    />
                    <button className='button' type='submit' value='Send' >Send Message</button>
                </form>
                </MuiThemeProvider>
            </div>
        </div>
    );
  }
}

Contact.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Contact);
