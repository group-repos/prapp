import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateModalClosed } from '../../../ducks/reducer'

import './AddSteps.css'

//MATERIAL-UI
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    input: {
      display: 'none',
    },
    displayFlex: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    title: {
        fontSize: '20px',
        fontWeight: 600,
        color: '#464646',
    },
    TextField: {
        width: 50,
        margin: '0 13px'
    },
    TextField2: {
        width: 250,
        margin: '0 13px'
    },
    listText: {
        fontSize: '16px',
        color: '#464646'
    }
  });
  
//MATERIAL-UI


class AddSteps extends Component {
    state = {
        steps: [],
        r_id: '',
        step: 1,
        description: '',
    };

    componentDidUpdate (prevProps, prevState) {
        if (this.props.newRecipe !== prevProps.newRecipe) {
            this.setState({r_id: this.props.newRecipe.r_id})
        }
        if (this.state.steps !== prevState.steps) {
            this.setState({steps: this.state.steps})
        }
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    
    getSteps = () => {
        axios.post(`/api/steps`, {r_id: this.state.r_id})
            .then(res => {
                console.log(res.data);
                this.setState({steps: res.data});
            });
    };

    addStep = () => {
        axios.post('/api/step', {r_id: this.state.r_id, step: this.state.step, description: this.state.description})
            .then(() => {
                this.getSteps();
            })
    }

    render () {
        const { classes } = this.props;
        console.log(this.state)
        let step = this.state.steps.map(e => (
                <p key={e.s_id}>{`Step ${e.step}: ${e.description}`}</p>
        ))
        return (
            <div className='AddSteps'>
                <div className={classes.title} style={{marginRight: '300px'}}>AddSteps</div>
                <div>
                    <p>
                        <TextField 
                            className={classes.TextField}
                            name='step' 
                            type='number'
                            id='standard-uncontrolled'
                            margin='normal'
                            label='Step'
                            fullWidth
                            type='number'
                            onInput={(e) => {      //sets max length of input to 2 characters
                                e.target.value = Math.max(0, parseInt(e.target.value,0) ).toString().slice(0,2)
                            }}
                            min={0}
                            margin='normal'
                        /> <span className={classes.title}>:</span> 
                        <TextField 
                            className={classes.TextField2}
                            name='description' 
                            onChange={this.handleChange}
                            id='standard-full-width'
                            label='Description'
                            fullWidth
                            margin='normal'
                            inputProps={{
                                maxLength: 300
                            }}
                            helperText={300 - this.state.description.length}
                            multiline
                            rowsMax='5'

                        /></p>
                    <Button 
                        onClick={this.addStep}
                        variant='text'
                        color='default'
                    >Add Step</Button>
                </div>
                {this.state.steps[0]
                ?
                <div className={classes.listText}>{step}</div>
                :
                <div className={classes.title}>Add Steps!</div>}
                <Button 
                    onClick={() => this.props.updateModalClosed()}
                    variant='outlined'
                    color='default'
                    style={{
                        marginTop: '10px'
                    }}
                >All Done!</Button>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        newRecipe: state.newRecipe
    };
};
export default withStyles(styles)(connect(mapStateToProps, {updateModalClosed})(AddSteps));