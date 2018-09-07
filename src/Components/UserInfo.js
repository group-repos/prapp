import React, {Component} from 'react';

export default class UserInfo extends Component {
    render(){
        return (
            <div className='UserInfoWrapper' >
                <div className='User' >
                    <div className='PhotoWrapper'>
                        <img src='https://images.unsplash.com/photo-1529932260967-af9d3bbd8138?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b3e872d900875102bc21577a8f6f1345&auto=format&fit=crop&w=634&q=80' alt='' />
                    </div>
                    <h3>About</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                    <div>
                        <p>Recipes</p>
                        <p>24</p>
                    </div>
                    <button>Weekly Meal Plan</button> <button>Shopping List</button>
                </div>
            </div>
        )
    }
}