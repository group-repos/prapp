import React, {Component} from 'react';

export default class UserInfo extends Component {
    render(){
        return (
            <div className='UserInfoWrapper' >
                <div className='User' >
                    <div className='PhotoWrapper'>
                        <img src='https://images.unsplash.com/photo-1529932260967-af9d3bbd8138?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b3e872d900875102bc21577a8f6f1345&auto=format&fit=crop&w=634&q=80' alt='' />
                    </div>
                    <div className='UserData'>
                        <h3>About</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                        <hr />
                        <div className='horizontalFlex' >
                            <p>Recipes</p>
                            <span><p>24</p></span>
                        </div>
                        <div className='UserButtons'>
                            <button>Weekly Meal Plan</button> 
                            <button>Shopping List</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}