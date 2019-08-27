import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import edit_icon from "./edit.png";
import delete_icon from "./delete.png";

export const Boardgame = props => (
	<tr>
		<td className={props.game.game_rating === 5 ? 'greatgame' : ''}>{props.game.game_name}</td>
		<td className={props.game.game_rating === 5 ? 'greatgame' : ''}>{props.game.game_category}</td>
		<td className={props.game.game_rating === 5 ? 'greatgame' : ''}>{props.game.game_rating}</td>
		<td className={props.game.game_rating === 5 ? 'greatgame' : ''}>{props.game.game_min_players}</td>
		<td className={props.game.game_rating === 5 ? 'greatgame' : ''}>{props.game.game_max_players}</td>
		<td className={props.game.game_rating === 5 ? 'greatgame' : ''}>{props.game.game_time}</td>
		<td>
			<Link to={"/edit/"+props.game._id}>
				<img src={edit_icon} width="20" height="20" />
			</Link>
		</td>
		<td>
			<Link to={"/delete/"+props.game._id}>
				<img src={delete_icon} width="20" height="23" />
			</Link>
		</td>
	</tr>
)
	
export default class GamesList extends Component {
	
	constructor(props) {
        super(props);
        this.state = {games: []};
    }
	
	componentDidMount() {
        axios.get('http://localhost:4000/boardgames/')
            .then(response => {
                this.setState({ games: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
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
	
    render() {
        return (
			<div>
				{ this.setUpTable() }
			</div>
        )
    }
	
}

