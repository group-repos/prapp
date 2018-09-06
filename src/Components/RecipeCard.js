import React, {Component} from 'react';

class RecipeCard extends Component {
    render(){
        return(
            <div>
                <h2>{this.props.num}</h2>
            </div>
        )
    }
}

export default RecipeCard