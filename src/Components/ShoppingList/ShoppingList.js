import  React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import _ from 'lodash';

//CSS
import './ShoppingList.css';
// import { array } from 'prop-types';

class ShoppingList extends Component {
    state = {
        unChecked: [],
        checked: [],
    }

    componentDidMount() {
        this.getWeeklyRecipes();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.unChecked !== prevState.unChecked) {
            this.setState({
                unChecked: this.state.unChecked,
            })
        }
        if (this.state.checked !== prevState.checked) {
            this.setState({
                checked: this.state.checked
            })
        }
    }

    checkOff = (i_id) => {
        let unChecked = [...this.state.unChecked];
        let checked = [...this.state.checked];
        let index = unChecked.findIndex(e => e.i_id === i_id);
        let item = unChecked.splice(index, 1);
        checked.push(item[0]);
        this.setState({
            unChecked: unChecked,
            checked: checked
        });
    }

    unCheck = (i_id) => {
        let unChecked = [...this.state.unChecked];
        let checked = [...this.state.checked];
        let index = checked.findIndex(e => e.i_id === i_id)
        let item = checked.splice(index, 1);
        unChecked.push(item[0]);
        this.setState({
            unChecked: unChecked,
            checked: checked
        })
    }

    getWeeklyRecipes () {
        axios.post('/api/shoppinglist', {u_id: 6})
            .then(res => {
                let finalArr = [];
                let tempArr = [...res.data]
                let ingredientArr = tempArr.map(recipe => recipe.ingredients);
                let flatIngredients = _.flatten(ingredientArr);
                flatIngredients.forEach(ingredient => {
                    let index = finalArr.findIndex(e => e.i_id === ingredient.i_id);
                    if (index === -1) {
                        finalArr.push(ingredient);
                    } else if (index >= 0) {
                        finalArr[index].quantity += ingredient.quantity;
                    }
                })
                finalArr.map(e => {
                    return e.unChecked = false;
                });
                this.setState({unChecked: finalArr});
            });
    }

    render () {
        return (
            <div className='ShoppingList'>
                <div className='shoppingHeader'>
                    <h1>Shopping List</h1>
                    {/* <h2>{this.props.user.r_name}</h2> */}
                </div>
                <div>
                    {this.state.unChecked[0]
                    ?
                    this.state.unChecked.map((e) => (
                        <div key={e.i_id} className='ingredientCheckbox'>
                            <button onClick={() => this.checkOff(e.i_id)}></button>
                            <div>
                                <p id='ingredient'>{e.ingredient}</p>
                                <p id='qty'>{e.quantity} {e.unit}</p>
                            </div>
                        </div>
                    ))
                    :
                    <div></div>}
                <div>
                {this.state.checked[0]
                    ?
                    <div className='completed'>
                        <h2>Completed</h2>
                        {this.state.checked.map((e) => (
                            <div key={e.i_id} className='ingredientChecked'>
                                <button onClick={() => this.unCheck(e.i_id)}>
                                </button>
                                <div>
                                    <p id='ingredient'>{e.ingredient}</p>
                                    <p id='qty'>{e.quantity} {e.unit}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    <div></div>}
                </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(ShoppingList);