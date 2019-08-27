import React, { Component } from 'react';
import axios from 'axios';

export default class CreateGame extends Component {
   
	constructor(props) {
        super(props);

		this.onChangeGameName = this.onChangeGameName.bind(this);
        this.onChangeGameMinPlayers = this.onChangeGameMinPlayers.bind(this);
        this.onChangeGameMaxPlayers = this.onChangeGameMaxPlayers.bind(this);
        this.onChangeGameTime = this.onChangeGameTime.bind(this);
        this.onChangeGameCategory = this.onChangeGameCategory.bind(this);
        this.onChangeGameRating = this.onChangeGameRating.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
		
        this.state = {
            game_name: '',
            game_min_players: '1',
            game_max_players: '1',
            game_time: '',
			game_category: '',
            game_rating: '',
			errors : {
				game_name: '',
				game_time: ''
			}
        }
    }
	
	onChangeGameName(e) {
        this.setState({
            game_name: e.target.value
        });
    }

    onChangeGameMinPlayers(e) {
        this.setState({
            game_min_players: e.target.value
        });
    }
	
	onChangeGameMaxPlayers(e) {
        this.setState({
            game_max_players: e.target.value
        });
    }

    onChangeGameTime(e) {
        this.setState({
            game_time: e.target.value
        });
    }
	
	onChangeGameCategory(e) {
		this.setState({
			game_category: e.target.value
		});
	}
	
	onChangeGameRating(e) {
		this.setState({
			game_rating: e.target.value
		});
	}

	onSubmit(e) {
        e.preventDefault();
		
		if (this.inputIsValid()) {
			console.log(`Form submitted:`);
			console.log(`Game Name: ${this.state.game_name}`);
			console.log(`Game Min Players: ${this.state.game_min_players}`);
			console.log(`Game Max Players: ${this.state.game_max_players}`);
			console.log(`Game Time: ${this.state.game_time}`);
			console.log(`Game Category: ${this.state.game_category}`);
			console.log(`Game Rating: ${this.state.game_rating}`);
        
			const newGame = {
				game_name : this.state.game_name,
				game_category : this.state.game_category,
				game_rating : this.state.game_rating,
				game_min_players : this.state.game_min_players,
				game_max_players : this.state.game_max_players,
				game_time : this.state.game_time
			}
			
			axios.post('http://localhost:4000/boardgames/add', newGame)
				.then(res => { 
					console.log(res.data); 
					this.props.history.push('/'); 
					});
		
			this.setState ({
				game_name: '',
				game_category: '',
				game_rating: '1',
				game_min_players: '',
				game_max_players: '',
				game_time: ''
			})		
		}
    }
	
	inputIsValid() {
		let isValid = true;
		
		const {
			game_name,
            game_time
		} = this.state;
		
		let errors = {
			game_name: '',
            game_time: ''
		}
		
		if (!game_name.trim()) {
			errors.game_name = 'Name is a required field';
			isValid = false;
		}
		
		if (!game_time) {
			errors.game_time = 'Time is a required field';
			isValid = false;
		} else if (isNaN(game_time)) {
			errors.game_time = 'Time must be a number';
			isValid = false;
		} else if (game_time <= 0) {
			errors.game_time = 'Time must be a positive number greater than 0';
			isValid = false;
		} else if (game_time > 900) {
			errors.game_time = "That's a very long board game! Are you sure you didn't make a typo?";
			isValid = false;
		}
		
		this.setState({errors});
		return isValid;
	}
	
	render() {
		const { errors } = this.state;
        return (
            <div style={{marginTop: 10}}>
                <h3>Add New Game</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input  type="text"
                                className={errors.game_name != '' ? 'form-control is-invalid' : 'form-control'}
                                value={this.state.game_name}
                                onChange={this.onChangeGameName}
                                />
						<div class="invalid-feedback">
							{this.state.errors.game_name}
						</div>
                    </div>
					<div className="form-group"> 
                        <label>Time (in minutes): </label>
                        <input  type="text"
                                className={errors.game_time != '' ? 'form-control is-invalid' : 'form-control'}
                                value={this.state.game_time}
                                onChange={this.onChangeGameTime}
                                />
						<div class="invalid-feedback">
							{this.state.errors.game_time}
						</div>
                    </div>
					<div className="form-group"> 
                        <label>Category: </label> {' '}
                        <select value={this.state.game_category} onChange={this.onChangeGameCategory}>
							<option value ="">None</option>
							<option value="Social">Social</option>
							<option value="Co-operative">Co-operative</option>
							<option value="Resource-based">Resource-based</option>
							<option value="Card">Card</option>
						</select>
                    </div>
                    <div className="form-group">
                        <label>Players: </label> {' '}
                        <select value={this.state.game_min_players} onChange={this.onChangeGameMinPlayers}>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
						</select>
						{' '} <label>to</label> {' '}
						<select value={this.state.game_max_players} onChange={this.onChangeGameMaxPlayers}>
							<option disabled={this.state.game_min_players > 1 ? true : null} value="1">1</option>
							<option disabled={this.state.game_min_players > 2 ? true : null} value="2">2</option>
							<option disabled={this.state.game_min_players > 3 ? true : null} value="3">3</option>
							<option disabled={this.state.game_min_players > 4 ? true : null} value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
							<option value="7">7</option>
							<option value="8">8</option>
						</select>
                    </div>
                    <div className="form-group">
						<label>Rating: </label>
						<br></br>
						<div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="ratingOptions" 
                                    id="oneStar" 
                                    value=""
                                    checked={!this.state.game_rating} 
                                    onChange={this.onChangeGameRating}
                                    />
                            <label className="form-check-label">None</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="ratingOptions" 
                                    id="oneStar" 
                                    value='1'
                                    checked={this.state.game_rating=='1'} 
                                    onChange={this.onChangeGameRating}
                                    />
                            <label className="form-check-label">1</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="ratingOptions" 
                                    id="twoStars" 
                                    value='2' 
                                    checked={this.state.game_rating=='2'} 
                                    onChange={this.onChangeGameRating}
                                    />
                            <label className="form-check-label">2</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="ratingOptions" 
                                    id="threeStars" 
                                    value='3'
                                    checked={this.state.game_rating=='3'} 
                                    onChange={this.onChangeGameRating}
                                    />
                            <label className="form-check-label">3</label>
                        </div>
						<div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="ratingOptions" 
                                    id="fourStars" 
                                    value='4'
                                    checked={this.state.game_rating=='4'} 
                                    onChange={this.onChangeGameRating}
                                    />
                            <label className="form-check-label">4</label>
                        </div>
						<div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="ratingOptions" 
                                    id="fiveStars" 
                                    value='5'
                                    checked={this.state.game_rating=='5'} 
                                    onChange={this.onChangeGameRating}
                                    />
                            <label className="form-check-label">5</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Game" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
	
}