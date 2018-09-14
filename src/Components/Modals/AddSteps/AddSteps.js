import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class AddSteps extends Component {
    state = {
        steps: [],
        r_id: '',
        step: 1,
        description: '',
    };

    componentDidUpdate (prevProps, prevState) {
        if (this.props.newRecipe !== prevProps.newRecipe) {
            this.setState({r_id: this.props.newRecipe.r_id})
        }
        if (this.state.steps !== prevState.steps) {
            this.setState({steps: this.state.steps})
        }
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    
    getSteps = () => {
        axios.post(`/api/steps`, {r_id: this.state.r_id})
            .then(res => {
                console.log(res.data);
                this.setState({steps: res.data});
            });
    };

    addStep = () => {
        axios.post('/api/step', {r_id: this.state.r_id, step: this.state.step, description: this.state.description})
            .then(() => {
                this.getSteps();
            })
    }

    render () {
        console.log(this.state)
        let step = this.state.steps.map(e => (
                <p key={e.s_id}>{`Step ${e.step}: ${e.description}`}</p>
        ))
        return (
            <div>
                <div>AddSteps</div>
                <div>
                    <p>Step <input name='step' type='number'/>: <input name='description' onChange={this.handleChange}/></p>
                    <button onClick={this.addStep}>Add Step</button>
                </div>
                {this.state.steps[0]
                ?
                <div>{step}</div>
                :
                <div>Add Steps!</div>}
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        newRecipe: state.newRecipe
    };
};

export default connect(mapStateToProps)(AddSteps);