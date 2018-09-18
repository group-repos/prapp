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
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';


//REDUX
import {connect} from 'react-redux';
import {updateModalOpen, updateRecipe} from '../../ducks/reducer';
// import {updateModalClosed} from '../../ducks/reducer';

const styles = theme => ({
    card: {
        width: 300,
        margin: '5px'
      },
      media: {
        height: 0,
        paddingTop: '66.25%', // 16:9
      },
      actions: {
        display: 'flex',
      },
      expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
        [theme.breakpoints.up('sm')]: {
          marginRight: -8,
        },
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      avatar: {
        backgroundColor: red[500],
      },
    addToCal: {
        width: '100%',
        borderRadius: 0,
        boxShadow: 0,
        // borderRight: '1px solid rgba(0,0,0,0.1)'
        // background: 'white',
        // color: 'rgba(0,0,0,0.5)',
        // fontSize: '20px',
        // letterSpacing: '2px',
        // marginTop: '10px'
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
        favoriteChecked: false,
        expanded: false,
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

handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
};

render(){
    let iconButtonStyling = {width: '20px'}
    let RecipePhotoWrapperClass = this.state.hover === 'open' ? 'RecipePhotoWrapper RecipePhotoWrapperHover' : 'RecipePhotoWrapper'
    let RecipeQuickViewClass = this.state.hover === 'open' ? 'recipeQuickView recipeQuickViewHover' : 'recipeQuickView'
    const { classes } = this.props;
    const { r_name, r_description, servings, rating, r_pics} = this.props.recipe
    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.media}
                image={r_pics}
                title="Contemplative Reptile"
            />
          <CardHeader
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title={r_name}
            subheader={`Serves ${servings} individuals`}
          />
          <CardContent>
            <Typography component="p">
                {r_description}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            {/* <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton> */}
            <Button variant='text' className={classNames(classes.addToCal)}>Add to Calendar</Button>
          </CardActions>
        </Card>
      );
    // return(
    //     <div>
    //     <div className='RecipeCards' 
    //         onMouseOver={() => this.mouseEnter()} 
    //         onMouseLeave={() => this.mouseExit()}
    //         >

    //         <div className={RecipePhotoWrapperClass}
    //             onClick={() => this.props.updateModalOpen('SingleRecipePage')}>
    //             <img src={this.props.recipe.r_pics} alt=""/>
    //         </div>
            
    //         <div className={RecipeQuickViewClass}>
    //             <div className='quickViewContent'>
    //                 <h2 onClick={() => this.props.updateModalOpen('SingleRecipePage')}>{this.props.recipe.r_name}</h2>
    //                 <p>{this.props.recipe.r_description}</p>
    //                 <p><span>Servings:</span> {this.props.recipe.servings} individuals</p>
    //             </div>
    //             <div className='cardTags'>
    //                 {this.state.tags.map((e, i) => {
    //                     return(
    //                     <p key={i}>{e}</p>
    //                     )
    //                 })}
    //             </div>
    //         </div>
    //         <div className='cardMenu'>
    //             <MuiThemeProvider theme={materialUiTheme}>
    //                 <Button 
    //                     variant="text" 
    //                     color='primary' 
    //                     className={classNames(classes.cardMenu)}
    //                     onClick={() => this.handleAddRecipe('Calendar')}
    //                     >
    //                     Calendar
    //                 </Button>
    //                 <Button 
    //                     variant="text" 
    //                     color='primary' 
    //                     className={classNames(classes.cardMenu)}
    //                     onClick={() => this.handleAddRecipe('Calendar')}
    //                     >
    //                     Calendar
    //                 </Button>
    //                 <Button 
    //                     variant="text" 
    //                     color='primary' 
    //                     className={classNames(classes.cardMenu)}
    //                     onClick={() => this.handleAddRecipe('Calendar')}
    //                     >
    //                     Calendar
    //                 </Button>
    //             </MuiThemeProvider>
    //         </div>
    //     </div>
    //     </div>
    // )
}
}

RecipeCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(null, {updateModalOpen,updateRecipe})(RecipeCard))