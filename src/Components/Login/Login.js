import React, { Component } from 'react';
import axios from 'axios';
import { auth, googleProvider, facebookProvider } from '../../firebase';
import { connect } from 'react-redux';

import { updateUser } from '../../ducks/reducer';
import './Login.css'

import facebook from '../../images/facebook-small.svg'
import google from '../../images/google.svg'


class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            user: {},
            newEmail: '',
            
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
        
    }

    //Adds a user to the database, then returns the new user.
    addUser = () => {
        let user = this.state.user;
        axios.post('/api/user', {user: user})
            .then(res => {
                console.log(res.data)
                this.props.updateUser(res.data)
            })
    }

    //Google Auth
    googleLogin = async () => {
        let googleInfo = await auth.signInWithPopup(googleProvider);
        let user = googleInfo.user;
        let nameArr = user.displayName.split(' ');
        await this.setState({
            user: {
                first_name: nameArr[0],
                last_name: nameArr[1],
                email: user.email,
                profile_pic: user.photoURL,
                auth_id: user.uid
            }
        })
        await this.addUser();
    }

    //Facebook Auth
    facebookLogin = async () => {
        let facebookInfo = await auth.signInWithPopup(facebookProvider);
        let user = facebookInfo.user;
        let nameArr = user.displayName.split(' ');
        await this.setState({
            user: {
                first_name: nameArr[0],
                last_name: nameArr[1],
                email: user.email,
                profile_pic: user.photoURL,
                auth_id: user.uid
            }
        })
        await this.addUser();
    }

    //Create email/password account
    createAccount = async () => {
        let createdUser = await auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
        console.log(createdUser)
    };

    //Email Sign In
    emailLogin = async () => {
        // let emailInfo = await auth.signInWithEmailAndPassword(this.state.email, this.state.password)
        // let user = emailInfo.user;
        // await this.setState({
        //     user: {
        //         email: user.email,
        //         auth_id: user.uid
        //     }
        // })
        // await console.log(this.state.user);
        // await this.props.updateUser(this.state.user)
        
    }

    render() {
        return (
            <div className='Login'>
                <div className='LoginBackground'>
                    <div className='Left'>
                        <div className='login__email-login'>
                            <h1>Welcome.</h1>
                            <h2>Please Log in to Continue.</h2>
                            <p>Email</p>
                            <input name='email' onChange={this.handleChange}/>
                            <p>Password</p>
                            <input name='password' onChange={this.handleChange} type='password'/>
                            <button onClick={() => this.emailLogin()}>Sign In</button>
                        </div>
                        <div className='SocialLoginWrapper'>
                            <button onClick={() => this.googleLogin()} id='google'><img src={google} alt='' />Login with Google</button>
                            <button onClick={() => this.facebookLogin()}id='facebook'><img src={facebook} alt='' />Login with Facebook</button>
                        </div>
                    </div>
                    <div className='Right'>
                        <div className='login__account-creation'>
                            <h2>Or <strong>create an account</strong></h2>
                            <input placeholder='Email' name='email' onChange={this.handleChange}/>
                            <input placeholder='Password' name='email' onChange={this.handleChange} type='password'/>
                            <button onClick={() => this.createAccount()}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { updateUser })(Login);