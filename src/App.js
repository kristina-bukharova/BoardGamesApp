import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import CreateGame from "./components/create-game.component";
import EditGame from "./components/edit-game.component";
import DeleteGame from "./components/delete-game.component";
import GamesList from "./components/games-list.component";

import logo from "./logo.png";

class App extends Component {
	render() {
		return (
			<Router>
				<div className="container">
					<nav className="navbar navbar-expand-lg navbar-light bg-light">
						<a className="navbar-brand" href="https://theuselessweb.com/" target="_blank">
							<img src={logo} width="50" height="50" alt="CodingTheSmartWay.com" />
						</a>
						<Link to="/" className="navbar-brand">MERN-Stack Games App</Link>
						<div className="collpase navbar-collapse">
							<ul className="navbar-nav mr-auto">
								<li className="navbar-item">
									<Link to="/" className="nav-link">Games</Link>
								</li>
								<li className="navbar-item">
									<Link to="/create" className="nav-link">Add Game</Link>
								</li>
							</ul>
						</div>
					</nav>
					<br/>
					<Route path="/" exact component={GamesList} />
					<Route path="/edit/:id" component={EditGame} />
					<Route path="/create" component={CreateGame} />
					<Route path="/delete/:id" component={DeleteGame} />
				</div>
			</Router>
	    );
	}
}

export default App;
