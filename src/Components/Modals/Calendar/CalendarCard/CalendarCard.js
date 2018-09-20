import React from 'react'
import './CalendarCard.css'

// Material UI
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import classNames from 'classnames'

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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
  width: {
    width: '50%',
    borderRadius: 0,
    boxShadow: 0,
  }
});

const materialUiTheme = createMuiTheme({
  palette: {
        primary: {main:'#0071bc'},
        secondary: {main: red[500]}
      }
})

class CalendarCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;
    const {r_name, servings, r_pics } = this.props.recipe
    return (
      <div className='CalendarMaterialCard'>
        <Card className={classes.card}>
          <CardHeader
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title={r_name}
            subheader={`Serves ${servings} individuals`}
          />
          <CardMedia
            className={classes.media}
            image={r_pics}
            title="Contemplative Reptile"
          />
          {/* <CardContent>
            <Typography component="p">
              {r_description}
            </Typography>
          </CardContent> */}
          <CardActions className={classes.actions} disableActionSpacing>
            <MuiThemeProvider theme={materialUiTheme}>
              <Button 
                variant="text" 
                color='primary' 
                className={classNames(classes.width)}
                onClick={() => this.props.duplicateRecipe(this.props.recipe.r_id, this.props.recipe.day)}>Duplicate</Button>
              <Button 
                variant="text" 
                color='secondary'
                className={classNames(classes.width)}
                onClick={() => this.props.deleteFromPlan(this.props.recipe.wr_id)}>Delete</Button>
            </MuiThemeProvider>
          </CardActions>
        </Card>
      </div>
    );
  }
}

CalendarCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CalendarCard);

// class CalendarCard extends Component {

//   render(){
//     const {r_name, r_description, servings, rating, r_pics } = this.props.recipe
//     return(
//       <div>
//       {this.props.recipe.r_name
//         ?      
//         <div className='CalendarCard'>
//         <div className='CalendarCardPhotoWrapper'>
//           <img src={r_pics} alt=""/>
//         </div>
//         <div className='CalendarCardContent'>
//           <div className='NameDescription'>
//             <h2>{r_name}</h2>
//             <p>{r_description}</p>
//           </div>
//           <div className='AddDelete'>
//             <button onClick={() => this.props.duplicateRecipe(this.props.recipe.r_id, this.props.recipe.day)}>Duplicate</button>
//             <button onClick={() => this.props.deleteFromPlan(this.props.recipe.wr_id)}>Remove</button>
//           </div>
//         </div>
//       </div>
//       : <div></div>}
//       </div>
//       )
//   }
// }

// export default CalendarCard