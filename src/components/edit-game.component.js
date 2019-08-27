import React, { Component } from 'react';
import axios from 'axios';
import CreateGame from "./create-game.component.js"

export default class EditGame extends CreateGame {
	
	constructor(props) {
        super(props);
    }
	
	componentDidMount() {
        axios.get('http://localhost:4000/boardgames/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    game_name : response.data.game_name,
					game_category : response.data.game_category,
					game_rating : response.data.game_rating,
					game_min_players : response.data.game_min_players,
					game_max_players : response.data.game_max_players,
					game_time : response.data.game_time
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }
	
	onSubmit(e) {
        e.preventDefault();
      
		const updatedGame = {
			game_name : this.state.game_name,
			game_category : this.state.game_category,
			game_rating : this.state.game_rating,
			game_min_players : this.state.game_min_players,
			game_max_players : this.state.game_max_players,
			game_time : this.state.game_time
		};
		
		console.log(updatedGame);
		
		if (this.inputIsValid()) {
			axios.put('http://localhost:4000/boardgames/update/'+this.props.match.params.id, updatedGame)
				.then(res => { 
					console.log(res.data); 
					this.props.history.push('/'); 
					});
		}
    }
	
    render() {
		return (
			<div>
				{ super.render() }
			</div>
        )
    }
}