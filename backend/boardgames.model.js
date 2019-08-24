const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Boardgames = new Schema({
    game_name: {
        type: String
    },
    game_category: {
        type: String
    },
    game_rating: {
        type: Number
    },
    game_min_players: {
        type: Number
    },
	game_max_players: {
        type: Number
    },
	game_time: {
        type: Number
    }
});

module.exports = mongoose.model('Boardgames', Boardgames);