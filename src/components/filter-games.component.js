import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import edit_icon from "./edit.png";
import delete_icon from "./delete.png";
import {Boardgame} from "./games-list.component.js"

export default class FilterGames extends Component {
	
	 constructor(props) {
        super(props);
        this.state = {games: [], search_field: '', search_value: '', isSubmitted: false};
		
		this.onChangeSearchField = this.onChangeSearchField.bind(this);
		this.onChangeSearchValue = this.onChangeSearchValue.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
    }

	gamesList() {
        return this.state.games.map(function(currentGame, i){
            return <Boardgame game={currentGame} key={i} />;
        })
    }
	
	setUpTable() {
        return (
				<div>
                <h3>Games List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Rating</th>
                            <th>Minimum players</th>
                            <th>Maximum players</th>
                            <th>Time Required</th>
							<th>Edit</th>
							<th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.gamesList() }
                    </tbody>
                </table>
            </div>
		)
    }
		
	onChangeSearchField(e) {
		this.setState({
			search_field: e.target.value,
			search_value: ''
		});
	}
	
	onChangeSearchValue(e) {
		this.setState({
			search_value: e.target.value
		});
	}
	
	onSubmit(e) {
		e.preventDefault();
		
		axios.get('http://localhost:4000/boardgames/search?' + this.state.search_field + "=" + this.state.search_value)
				.then(res => { 
					this.setState({ games: res.data });
					this.setState({isSubmitted: true});
					console.log(this.state.games);
				})
				.catch(function (error){
					console.log(error);
				})

		this.setState ({
			games: [], 
			search_field: '', 
			search_value: '', 
			isSubmitted: false
		})		
	}

    render() {
        return (
			<div style={{marginTop: 10}}>
                <h3>Find Games</h3>
				<form onSubmit={this.onSubmit}>
						<div className="form-group"> 
							{' '}<label>where</label>{' '}
							<select value={this.state.search_field} onChange={this.onChangeSearchField}>
								<option value =""></option>
								<option value="game_name">name</option>
								<option value="game_time">time (in minutes)</option>
								<option value="game_rating">rating</option>
								<option value="game_min_players">minimum players</option>
								<option value="game_max_players">maximum players</option>
								<option value="game_category">category</option>
							</select>
							
							{' '}<label>is</label>{' '}
							
							<input  type="text"
									className={this.state.search_field === "game_category"? "d-none" : null}
									value={this.state.search_value}
									onChange={this.onChangeSearchValue}
							/>
							
							<select className={this.state.search_field === "game_category"? null : "d-none"} value={this.state.search_value} onChange={this.onChangeSearchValue}>
								<option value="">empty</option>
								<option value="Social">social</option>
								<option value="Co-operative">co-operative</option>
								<option value="Resource-based">resource-based</option>
								<option value="Card">card</option>
							</select>
						</div>
						<div className="form-group">
							<input type="submit" value="Search" className="btn btn-primary" />
						</div>
				</form>
                { this.state.isSubmitted && this.setUpTable() }
			</div>
        )
    }
}