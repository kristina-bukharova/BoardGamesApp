import React, { Component } from 'react';

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
            game_min_players: '',
            game_max_players: '',
            game_time: '',
			game_category: '',
            game_rating: '1'
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
        
        console.log(`Form submitted:`);
        console.log(`Game Name: ${this.state.game_name}`);
        console.log(`Game Min Players: ${this.state.game_min_players}`);
        console.log(`Game Max Players: ${this.state.game_max_players}`);
        console.log(`Game Time: ${this.state.game_time}`);
        console.log(`Game Category: ${this.state.game_category}`);
        console.log(`Game Rating: ${this.state.game_rating}`);
        
        this.state = {
            game_name: '',
            game_min_players: '',
            game_max_players: '',
            game_time: '',
			game_category: '',
            game_rating: ''
        }
    }
	
	 render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Add New Game</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.game_name}
                                onChange={this.onChangeGameName}
                                />
                    </div>
					<div className="form-group"> 
                        <label>Time (in minutes): </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.game_time}
                                onChange={this.onChangeGameTime}
                                />
                    </div>
					<div className="form-group"> 
                        <label>Category: </label> {' '}
                        <select value={this.state.value} onChange={this.onChangeGameCategory}>
							<option value ="empty"></option>
							<option value="social">Social</option>
							<option value="cooperative">Co-operative</option>
							<option value="resource">Resource-based</option>
							<option value="card">Card</option>
						</select>
                    </div>
                    <div className="form-group">
                        <label>Players: </label> {' '}
                        <select value={this.state.value} onChange={this.onChangeGameMinPlayers}>
							<option value ="empty"></option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
						</select>
						{' '} <label>to</label> {' '}
						<select value={this.state.value} onChange={this.onChangeGameMaxPlayers}>
							<option value ="empty"></option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
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
                                    value='1'
                                    checked={this.state.game_rating==='1'} 
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
                                    checked={this.state.game_rating==='2'} 
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
                                    checked={this.state.game_rating==='3'} 
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
                                    checked={this.state.game_rating==='4'} 
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
                                    checked={this.state.game_rating==='5'} 
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