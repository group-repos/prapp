import React, { Component } from 'react';
import axios from 'axios';

import './EditUserProfile.css';

class EditUserProfile extends Component {
    state = {
        file: '',
        filename: '',
        filetype: '',
        img: '',
    };

    handlePhoto = (event) => {
        const reader = new FileReader();
        const file = event.target.files[0];
        reader.onload = photo => {
            this.setState({
                file: photo.target.result,
                filename: file.name,
                filetype: file.type,
                img: '',
            });
        };
        reader.readAsDataURL(file);
    }

    sendPhoto = () => {
        return axios.post('/api/s3', this.state)
            .then(response => {
                this.setState({img: response.data.Location})
            })
    }

    render () {
        return (
            <div>
                <div>EditUserProfile</div>
                <input type="file" id="real" onChange={this.handlePhoto}/>
                <button onClick={this.sendPhoto}>Upload</button>
                <div>
                    <img src={this.state.img} alt='' />
                </div>
            </div>
        )
    };
};

export default EditUserProfile;