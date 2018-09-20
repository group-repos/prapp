import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

//TESTS
import { getNewRecipe, getNewRecipeId, getNewRecipeName, getNewRecipeDescription, getNewRecipeServings } from '../../../Logic/logic';

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
    listText: {
        fontSize: '16px',
        color: '#464646'
    }
  });
  
//MATERIAL-UI

class AddIngredient extends Component {
    state = {
        ingredients: [],
        r_id: '',
        ingredient: '',
        quantity: '',
        unit: ''
    }

    // async componentDidMount () {
    //     await this.setState({r_id: this.props.newRecipe.r_id});
    //     await this.getIngredients(this.state.r_id);
    // }

    componentDidUpdate (prevProps, prevState) {
        if (this.props.newRecipe !== prevProps.newRecipe) {
            this.setState({r_id: this.props.newRecipe.r_id})
        }
        if (this.state.ingredients !== prevState.ingredients) {
            this.setState({ingredients: this.state.ingredients})
        }
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    
    getIngredients = () => {
        axios.post(`/api/ingredients`, {r_id: this.state.r_id})
            .then(res => {
                console.log(res.data)
                this.setState({ingredients: res.data})
            })
    }

    addIngredient = () => {
        axios.post('/api/ingredient', {r_id: this.state.r_id, ingredient: this.state.ingredient, quantity: this.state.quantity, unit: this.state.unit})
        .then(() => {
            this.getIngredients();
        })
    }
    
    render () {
        console.log(this.state);
        const { classes } = this.props;
        let ingredientsList = this.state.ingredients.map(e => (
                <p key={e.i_id}>{`${e.ingredient}: ${e.quantity} ${e.unit}`}</p>
        ))
        return (
            <div>
                {getNewRecipe(this.props.newRecipe)}  
                {getNewRecipeId(this.props.newRecipe.r_id)}
                {getNewRecipeName(this.props.newRecipe.r_name)}
                {getNewRecipeDescription(this.props.newRecipe.r_description)}
                {getNewRecipeServings(this.props.newRecipe.servings)}
                <div className={classes.title} style={{marginRight: '300px'}}>AddIngredient</div>
                <div>
                    <TextField 
                        name='ingredient' 
                        onChange={this.handleChange} 
                        id='standard-full-width'
                        label='ingredient'
                        fullWidth
                        margin='normal'
                        inputProps={{
                            maxLength: 120
                        }}
                        helperText={120 - this.state.ingredient.length}
                        multiline
                        rowsMax='3'
                    />
                    <TextField 
                        name='quantity' 
                        onChange={this.handleChange} 
                        label='quantity' 
                        id='standard-full-width'
                        fullWidth
                        type='number'
                        onInput={(e) => {      //sets max length of input to 2 characters
                            e.target.value = Math.max(0, parseInt(e.target.value,0) ).toString().slice(0,2)
                        }}
                        min={0}
                        margin='normal'
                        helperText={2 - this.state.quantity.length}
                    />
                    <TextField 
                        name='unit' 
                        onChange={this.handleChange} 
                        label='unit'
                        id='standard-full-width'
                        fullWidth
                        margin='normal'
                        inputProps={{
                            maxLength: 30
                        }}
                        helperText={30 - this.state.unit.length}
                        multiline
                        rowsMax='3'

                    />
                    <Button 
                        onClick={() => this.addIngredient()}
                        variant='outlined'
                        color='default'
                        style={{
                            // position: 'absolute',
                            // right: '49px',
                            // bottom: '24px',
                        }}
                    >Add Ingredient</Button>
                </div>
                {this.state.ingredients[0]
                ?
                <div className='listText'>{ingredientsList}</div>
                :
                <p className={classes.title} style={{marginRight: '300px'}}>Add ingredients!</p>}
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        newRecipe: state.newRecipe
    }
}

export default withStyles(styles)(connect(mapStateToProps)(AddIngredient));