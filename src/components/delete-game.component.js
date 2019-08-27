import React, { Component } from 'react';
import axios from 'axios';

export default class DeleteGame extends Component {
	
	constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
	
    delete() {
        axios.delete('http://localhost:4000/boardgames/delete/'+this.props.match.params.id)
            .then(console.log('Deleted'))
			.then(this.props.history.push('/'))
            .catch(err => console.log(err))
			
		this.props.history.push('/');
    }
	
    render() {
        return (
			<div>
				{this.delete()}
			</div>
        )
    }
}