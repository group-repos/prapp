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

    async componentDidMount () {
        await this.setState({r_id: this.props.newRecipe.r_id});
        await this.getSteps(this.state.r_id);
    };

    componentDidUpdate(prevProps) {
        if (this.props.newRecipe.r_id !== prevProps.newRecipe.r_id) {
            this.componentDidMount();
        };
    };

    getSteps = (r_id) => {
        axios.get(`/api/steps/${r_id}`)
            .then(res => {
                this.setState({steps: res.data});
            });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    addStep = () => {
        axios.post('/api/steps', {r_id: this.state.r_id, step: this.state.step, description: this.state.description})
            .then(() => {
                this.setState({step: ++this.state.step})
                this.componentDidMount();
            })
    }

    render () {
        console.log(this.state)
        return (
            <div>
                <div>AddSteps</div>
                <div>
                    <p>Step {this.state.step}: <input name='description' onChange={this.handleChange}/></p>
                    <button onClick={this.addStep}>Add Step</button>
                </div>
                {this.state.steps[0]
                ?
                this.state.steps.map(e => (
                    <div key={e.s_id}>
                        <p>{`Step ${e.step}: ${e.description}`}</p>
                    </div>
                ))
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