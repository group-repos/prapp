import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { updateNewRecipe } from '../../../ducks/reducer';

// CSS
import './AddRecipe.css'

class AddRecipe extends Component {
    state = {       
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
                console.log(res.data);
                this.props.updateNewRecipe(res.data[0]);
            })
    }

    render () {
        return (
            // <div>
            // {this.props.user.u_id 
            // ?
                <div className='AddRecipe'>
                    <div>AddRecipe</div>
                    <div>
                        <div>
                            <p>Recipe Name: </p>
                            <input name='r_name' onChange={this.handleChange}/>
                            <hr/>
                        </div>
                        <div>
                            <p>Number of Servings:</p>
                            <input name='servings' onChange={this.handleChange}/>
                            <hr/>
                        </div>
                        <div>
                            <p>Upload Image:</p>
                            <div>
                                <input type='file' onChange={this.handlePhoto}/>
                                <button onClick={this.sendPhoto}>Upload</button>
                            </div>
                            <img src={this.state.r_pics} alt='' style={{width: '100px'}}/>
                            <hr/>
                        </div>
                        <div>
                            <p>Recipe Description:</p>
                            <div>Remaining Characters: {120 - this.state.r_description.length}</div>
                            <input name='r_description' maxLength='120' onChange={this.handleChange}/>
                            <hr/>
                        </div>
                        <button onClick={this.addRecipe}>Add Recipe</button>
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

export default connect(mapStateToProps, { updateNewRecipe })(AddRecipe);