import React, {Component} from 'react';
import axios from 'axios';

// Redux
import { connect } from 'react-redux'
import { updateModalOpen } from '../../ducks/reducer'

import RecipeCard from '../RecipeCard/RecipeCard';

// Material UI
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import red from '@material-ui/core/colors/red';

// CSS
import './BrowseRecipes.css'

const styles = theme => ({
  button: {
    position:'absolute',
    zIndex: 10,
    right: '20px',
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

const materialUiTheme = createMuiTheme({
  palette: {
        primary: {main: red[500]},
        secondary: {main: '#fff'}
      }
})

class BrowseRecipes extends Component {
  constructor(){
    super()
    this.state = {
      activeCategory: 0,
      recipes: []
    }
  }

  //Gets an array of all recipes, ingredients, and steps in the database.
  componentDidMount() {
      axios.get('/api/getrecipes')
          .then(res => {
              this.setState({recipes: res.data})
          });
  };

  handleClick (i){
    this.setState({
      activeCategory:i
    })
  }

  render(){
    const { classes } = this.props
    let recipe = this.state.recipes.map((recipe) => (
      <RecipeCard recipe={recipe} key={recipe.r_id}/>
  ))
      return (
          <div className='BrowseRecipes'>
              <div className='categories'>
                {this.props.BrowseRecipesMenu ?   
                  this.props.BrowseRecipesMenu.map((e,i) => {
                    let recipeClasses = this.state.activeCategory === i ? 'ActiveRecipe' : ''
                      return (
                      <div key={i}  
                        onClick={()=> this.handleClick(i)}
                        className='categoryWrapper'>
                          <p>{e}</p>
                          <div className={recipeClasses}/>
                      </div>)
                }):''}
              </div>
              <div className='recipeCardsWrapper'>
                <MuiThemeProvider theme={materialUiTheme}>
                  <Button 
                    variant="fab" 
                    color="secondary" 
                    // aria-label="Add" 
                    className={classes.button}
                    onClick={() => this.props.updateModalOpen('AddFullRecipe')}>
                    <AddIcon />
                  </Button>
                </MuiThemeProvider>
                {this.state.recipes
                  ? 
                  recipe
                  :
                  <div></div>}
              </div>
          </div>
      )
  }
}

export default withStyles(styles)(connect(null, {updateModalOpen})(BrowseRecipes))