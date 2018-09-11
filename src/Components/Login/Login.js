import React, { Component } from 'react';
import axios from 'axios';
import { auth, googleProvider, facebookProvider } from '../../firebase';
import { connect } from 'react-redux';

import { updateUser } from '../../ducks/reducer';


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
            <div>
                <div>Login</div>
                <form className='login__account-creation'>
                    <div>Create an account</div>
                    <input placeholder='Email' name='email' onChange={this.handleChange}/>
                    <input placeholder='Password' name='email' onChange={this.handleChange} type='password'/>
                    <button onClick={() => this.createAccount()}>Create Account</button>
                </form>
                <form className='login__email-login'>
                    <div>Sign In</div>
                    <input placeholder='Email' name='email' onChange={this.handleChange}/>
                    <input placeholder='Password' name='password' onChange={this.handleChange} type='password'/>
                    <button onClick={() => this.emailLogin()}>Sign In</button>
                </form>
                <div>
                    <button onClick={() => this.googleLogin()}>Login with Google</button>
                    <button onClick={() => this.facebookLogin()}>Login with Facebook</button>
                </div>
            </div>
        )
    }
}

export default connect(null, { updateUser })(Login);