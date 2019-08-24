const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const gameRoutes = express.Router();
const PORT = 4000;

let Boardgames = require('./boardgames.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/boardgames', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

gameRoutes.route('/').get(function(req, res) {
    Boardgames.find(function(err, games) {
        if (!games) {
            res.status(404).json(err);
        } else {
            res.status(200).json(games);
        }
    });
});

gameRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Boardgames.findById(id, function(err, game) {
		if (err) {
            res.status(400).send(err);
		}
        if (!game) {
            res.status(404).send("Game not found");
        } else {
            res.status(200).json(game);
        }
    });
});

gameRoutes.route('/add').post(function(req, res) {
    let game = new Boardgames(req.body);
    game.save()
        .then(game => {
            res.status(201).json("Game added");
        })
        .catch(err => {
            res.status(400).send('Adding new game failed');
        });
});

gameRoutes.route('/delete/:id').delete(function(req, res) {
    Boardgames.remove({
       _id: req.params.id
    }, function(err, user) {
		if (err) {
            res.status(400).send(err);
		}
		if (!user) 
			res.status(404).send("Game does not exist");
		else 
			res.status(200).json({ message: 'Deleted' });
			
	});
});

gameRoutes.route('/update/:id').put(function(req, res) {
    Boardgames.findById(req.params.id, function(err, game) {
        if (!game)
            res.status(404).send("Game not found");
        else
            game.game_name = req.body.game_name;
            game.game_category = req.body.game_category;
            game.game_rating = req.body.game_rating;
            game.game_min_players = req.body.game_min_players;
            game.game_max_players = req.body.game_max_players;
            game.game_time = req.body.game_time;

            game.save().then(game => {
                res.status(204).json('Game updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});
	
app.use('/boardgames', gameRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

