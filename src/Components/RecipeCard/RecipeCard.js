import React, {Component} from 'react';

import './RecipeCard.css'

import addRecipeIcon from '../../images/Asset8.svg'
import editRecipeIcon from '../../images/Asset7.svg'
// import GlobalModal from '../Modals/GlobalModal';

//MATERIAL-UI
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import {MuiThemeProvider, createMuiTheme, withStyles} from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import classNames from 'classnames'
import red from '@material-ui/core/colors/red';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd'

//REDUX
import {connect} from 'react-redux';
import {updateModalOpen, updateRecipe} from '../../ducks/reducer';
// import {updateModalClosed} from '../../ducks/reducer';

const styles = theme => ({
    width: {
        width: '100%',
        borderRadius: 0,
        boxShadow: 0,
        // background: '#333',
        // color: 'rgba(0,0,0,0.5)',
        // fontSize: '20px',
        letterSpacing: '2px',
        // marginTop: '10px'
    },
    icon: {
        width: '52px',
    }
})

const materialUiTheme = createMuiTheme({
    palette: {
        primary: {main: '#333'},
        secondary: {main: red[500]}
    }
})

class RecipeCard extends Component {
constructor(){
    super()
    this.state = {
        hover:'closed',
        tags: ['drinks', 'breakfast', 'chicken', 'lunch', 'keto', 'tag', 'food'],
        favoriteChecked: false
    }
}
mouseEnter(){
    this.setState({
        hover: 'open'
    })
}

mouseExit(){
    this.setState({
        hover: 'closed'
    })
}

handleFavoriteChange = name => event => {
    this.setState({[name]: event.target.checked})
}

handleAddRecipe = (componentName) => {
    this.props.updateModalOpen(componentName)
    this.props.updateRecipe(this.props.recipe)
}

render(){
    let iconButtonStyling = {width: '20px'}
    let RecipePhotoWrapperClass = this.state.hover === 'open' ? 'RecipePhotoWrapper RecipePhotoWrapperHover' : 'RecipePhotoWrapper'
    let RecipeQuickViewClass = this.state.hover === 'open' ? 'recipeQuickView recipeQuickViewHover' : 'recipeQuickView'
    const { classes } = this.props;
    return(
        <div>
        <div className='RecipeCards' 
            onMouseOver={() => this.mouseEnter()} 
            onMouseLeave={() => this.mouseExit()}
            >

            <div className={RecipePhotoWrapperClass}
                onClick={() => this.props.updateModalOpen('SingleRecipePage')}>
                <img src={this.props.recipe.r_pics} alt=""/>
            </div>
            
            <div className={RecipeQuickViewClass}>
                <div className='quickViewContent'>
                    <h2 onClick={() => this.props.updateModalOpen('SingleRecipePage')}>{this.props.recipe.r_name}</h2>
                    <p>{this.props.recipe.r_description}</p>
                    <p><span>Servings:</span> {this.props.recipe.servings} individuals</p>
                </div>
                <div className='cardTags'>
                    {this.state.tags.map((e, i) => {
                        return(
                        <p key={i}>{e}</p>
                        )
                    })}
                </div>
            </div>
            <div className='cardMenu'>
                <MuiThemeProvider theme={materialUiTheme}>
                    <Button 
                        variant="text" 
                        color='primary' 
                        className={classNames(classes.width)}
                        onClick={() => this.handleAddRecipe('Calendar')}
                        >
                        <PlaylistAdd className={classNames(classes.icon)}/>Add to Calendar
                    </Button>
                </MuiThemeProvider>
            </div>
        </div>
        </div>
    )
}
}

RecipeCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(null, {updateModalOpen,updateRecipe})(RecipeCard))