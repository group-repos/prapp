import React, {Component} from 'react';

import './RecipeCard.css'

import favoriteIcon from '../../images/Asset6.svg'
import addRecipeIcon from '../../images/Asset8.svg'
import editRecipeIcon from '../../images/Asset7.svg'
import GlobalModal from '../Modals/GlobalModal';

//MATERIAL-UI
import IconButton from '@material-ui/core/IconButton';

//REDUX
import {connect} from 'react-redux';
import {updateModalOpen} from '../../ducks/reducer';
import {updateModalClosed} from '../../ducks/reducer';


class RecipeCard extends Component {
constructor(){
    super()
    this.state = {
        hover:false,
        tags: ['drinks', 'breakfast', 'chicken', 'lunch', 'keto', 'tag', 'food']
    }
}
mouseEnter(){
    this.setState({
        hover: true
    })
}

mouseExit(){
    this.setState({
        hover: false
    })
}

openModal(Login){
    this.setState({
        hover: false
    })
    this.props.updateModalOpen(Login)
}

render(){
    let iconButtonStyling = {width: '20px'}
    let RecipePhotoWrapperClass = this.state.hover ? 'RecipePhotoWrapper RecipePhotoWrapperHover' : 'RecipePhotoWrapper'
    let RecipeQuickViewClass = this.state.hover ? 'recipeQuickView recipeQuickViewHover' : 'recipeQuickView'
    let cardMenuClass = this.state.hover ? 'cardMenu cardMenuHover' : 'cardMenu'
    return(
        <div className='RecipeCards' 
            onMouseEnter={() => this.mouseEnter()} 
            onMouseLeave={() => this.mouseExit()}>
            <div className={RecipePhotoWrapperClass}>
                <img src={this.props.recipe.r_pics} alt=""/>
            </div>
            <div className={RecipeQuickViewClass}>
                <div className={cardMenuClass}>
                    <IconButton variant='fab' color='primary'>
                        <img src={editRecipeIcon} alt="" style={iconButtonStyling}/>
                    </IconButton>
                    <IconButton  variant='fab' color='primary'>
                        <img onClick={() => this.openModal('Login')} src={addRecipeIcon} alt="" style={iconButtonStyling}/>
                        <GlobalModal />
                    </IconButton>
                    <div className='favoriteCounter'>
                        <IconButton variant='fab' color='primary'>
                            <img src={favoriteIcon} alt="" style={iconButtonStyling}/>
                        </IconButton>
                        <p>{this.props.recipe.rating}</p>
                    </div>
                </div>
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
        </div>
    )
}
}

export default connect(null, {updateModalOpen})(RecipeCard)