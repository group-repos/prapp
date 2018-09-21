import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { updateNewRecipe, updateModalClosed } from '../../../ducks/reducer';

// CSS
import './AddRecipe.css';

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
  });
  
//MATERIAL-UI


class AddRecipe extends Component {
    constructor(){
        super()
        
        this.state = {       
            img: {
                file: '',
                filename: '',
                filetype: '',
                img: ''
            },
            u_id: 2,
            r_name: '',
            servings: '',
            r_pics: '',
            r_description: ''
        }
    }
        
    handlePhoto = (event) => {
        const reader = new FileReader();
        const file = event.target.files[0];
        reader.onload = photo => {
            this.setState({
                img: {
                    file: photo.target.result,
                    filename: file.name,
                    filetype: file.type,
                    img: ''
                }
            });
        };
        reader.readAsDataURL(file);
    }

    sendPhoto = () => {
        return axios.post('/api/s3', this.state.img)
            .then(response => {
                this.setState({r_pics : response.data.Location})
            })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    addRecipe = () => {
        axios.post('/api/recipes',{u_id: this.state.u_id, servings: this.state.servings, r_name: this.state.r_name, r_pics: this.state.r_pics, r_description: this.state.r_description})
            .then(res => {
                // console.log(res.data);
                this.props.updateNewRecipe(res.data[0]);
                // this.props.updateModalClosed();
                this.props.classSwitcher('ModalTwo')
            })
    }

    render () {
        // console.log(this.state)
        const { classes } = this.props;
        return (
            // <div>
            // {this.props.user.u_id 
            // ?
                <div className='AddRecipe'>
                    <div className={classes.title} style={{marginRight: '300px'}}>AddRecipe</div>
                    <div>
                        <div>
                            <TextField 
                                name='r_name'
                                onChange={this.handleChange}
                                id='standard-full-width'
                                label='Recipe Name'
                                fullWidth
                                margin='normal'
                                inputProps={{
                                    maxLength: 120
                                }}
                                helperText={120 - this.state.r_name.length}
                                multiline
                                rowsMax='3'
                            />
                        </div>
                        <div>
                            <TextField 
                                name='servings'
                                onChange={this.handleChange}
                                id='standard-full-width'
                                label='Number of Servings'
                                fullWidth
                                type='number'
                                onInput={(e) => {      //sets max length of input to 2 characters
                                    e.target.value = Math.max(0, parseInt(e.target.value,0) ).toString().slice(0,2)
                                }}
                                min={0}
                                margin='normal'
                                helperText={2 - this.state.servings.length}
                            />
                        </div>
                        <div>
                            <p className={classes.title} style={{marginTop: '20px'}}>Upload Image:</p>
                            {/* <img src={this.state.r_pics} alt='' id='uploadedImage'/> */}
                            <div className={classes.displayFlex}>
                                {/* <input type='file' onChange={this.handlePhoto}/> */}
                                <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={this.handlePhoto} />
                                <label htmlFor="icon-button-file">
                                    <Button
                                        variant='text'
                                        color="primary" 
                                        className={classes.button} 
                                        component="span"
                                    >
                                        <PhotoCamera />
                                    </Button>
                                </label>

                                <Button
                                    onClick={this.sendPhoto}
                                    variant='text'
                                    color='primary'
                                >
                                Upload</Button>
                            </div>
                            <img src={this.state.r_pics} alt='' style={{width: '100px'}}/>
                        </div>
                        <div>
                            <TextField 
                                name='r_description'
                                onChange={this.handleChange}
                                id='standard-full-width'
                                label='Recipe Description'
                                fullWidth
                                margin='normal'
                                inputProps={{
                                    maxLength: 250
                                }}
                                helperText={250 - this.state.r_description.length}
                                multiline
                                rowsMax='5'
                            />
                        </div>
                        <Button 
                            onClick={this.addRecipe}
                            variant='outlined'
                            color='default'
                            style={{
                                position: 'absolute',
                                right: '49px',
                                bottom: '24px',
                            }}
                        >Add Recipe</Button>
                    </div>

                </div>
            // :
            //     <div>Please Sign In to Add a Recipe</div>}
            // </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        user: state.user,
    }
}

export default withStyles(styles)(connect(mapStateToProps, { updateNewRecipe, updateModalClosed })(AddRecipe));