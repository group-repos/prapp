import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
// import Button from '@material-ui/core/Button';

//REDUX
import {connect} from 'react-redux';
import {updateModalClosed, updateModalOpen} from '../../ducks/reducer';


function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class SimpleModal extends React.Component {
  state = {
    open: false,
  };

  // handleOpen = () => {
  //   this.setState({ open: true });
  // };

  handleClose = () => {
    this.props.updateModalClosed();
  };

  componentDidMount(){
    this.setState({open: this.props.modalOpen})
  }

  componentDidUpdate(prevProps){
    if(this.props.modalOpen !== prevProps.modalOpen){
      this.setState({open: this.props.modalOpen})
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        {/* <Button onClick={this.handleOpen}>Open Modal</Button> */}
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" id="modal-title">
              Text in a modal
            </Typography>
            <Typography variant="subheading" id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
            {/* <SimpleModalWrapped /> */}
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

function mapStateToProps(state){
  return {
    modalOpen: state.modalOpen
  }
}


export default connect(mapStateToProps, {updateModalClosed})(SimpleModalWrapped)