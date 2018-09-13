import React, {Component} from 'react';

import './RecipeCard.css'

import addRecipeIcon from '../../images/Asset8.svg'
import editRecipeIcon from '../../images/Asset7.svg'
// import GlobalModal from '../Modals/GlobalModal';

//MATERIAL-UI
import IconButton from '@material-ui/core/IconButton';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

//REDUX
import {connect} from 'react-redux';
import {updateModalOpen} from '../../ducks/reducer';
// import {updateModalClosed} from '../../ducks/reducer';


const materialUiTheme = createMuiTheme({
    palette: {
        primary: {main: '#0071BC'},
        secondary: {main: '#0071BC'}
    }
})

class RecipeCard extends Component {
constructor(){
    super()
    this.state = {
        hover:false,
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

render(){
    let iconButtonStyling = {width: '20px'}
    let RecipePhotoWrapperClass = this.state.hover === 'open' ? 'RecipePhotoWrapper RecipePhotoWrapperHover' : 'RecipePhotoWrapper'
    let RecipeQuickViewClass = this.state.hover === 'open' ? 'recipeQuickView recipeQuickViewHover' : 'recipeQuickView'
    return(
        <div>
        <div className='RecipeCards' 
            onMouseOver={() => this.mouseEnter()} 
            onMouseLeave={() => this.mouseExit()}
            >

            <div className={RecipePhotoWrapperClass}>
                <img src={this.props.recipe.r_pics} alt=""/>
            </div>
            
            <div className={RecipeQuickViewClass}>
                <div className='quickViewContent'>
                    <h2>{this.props.recipe.r_name}</h2>
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
                <IconButton variant='fab' color='primary'>
                    <img src={editRecipeIcon} alt="" style={iconButtonStyling}/>
                </IconButton>
                <IconButton  variant='fab' color='primary' onClick={() => this.props.updateModalOpen('Calendar')}>
                    <img  
                        src={addRecipeIcon} 
                        alt="" 
                        style={iconButtonStyling}
                    />
                    
                </IconButton>
                <div className='favoriteCounter'>
                        <MuiThemeProvider theme={materialUiTheme} >
                            <FormControlLabel 
                                control={<Checkbox onChange={this.handleFavoriteChange('favoriteChecked')} icon={<FavoriteBorder color='primary' />} checked={this.state.favoriteChecked} checkedIcon={<Favorite />} value='favoriteChecked' />}
                            />
                        </MuiThemeProvider>
                    <p>{this.props.recipe.rating}</p>
                </div>
            </div>

        </div>
        </div>
    )
}
}

export default connect(null, {updateModalOpen})(RecipeCard)