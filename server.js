const express = require('express');
const jwt = require('jsonwebtoken');

	app = express();
	port = process.env.PORT || 3000,
	bodyParser = require('body-parser'),
	controller = require('./controller');

	app.get('/api', (req, res)=> { 
	res.json({
	message: 'Welcome to the api'
	});	});

	app.post('/api/posts', verifyToken, (req, res) => {
		jwt.verify(req.token, 'secretkey', (err, authData) => {
			if (err){
				res.sendStatus(403);
			} else {
				res.json({
					message: 'post created..',
					authData
				});
			}
		});
	});

	app.post('api/login', (req, res) => {
		const user = {
			username: 'alif'
		}

	jwt.sign({user}, 'secretkey', { expiresIn: '60s' }, (err, token) => {
		res.json({
			token
		});
	});
	});

	function verifyToken(req, res, next){
		const bearerHeader = req.headers['authorization'];
		if (typeof bearerHeader !== 'undefined') {
			const bearer = bearerHeader.split('  ');
			const bearerToken = bearer[1];
			req.token = bearerToken;
			next();
		} else {
			res.sendStatus(403);
		}
	}
// const posts [
// 	{
// 		username: 'Alif',
// 		title: 'Post1'
// 	},
// 	{
// 		username: 'Krisnanda',
// 		title: 'Post2'
// 	}
// ]

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./routes');
routes(app);

// app.get('/posts', (req, res) => {
//   res.json(posts)
// })

app.listen(port);
console.log('Belajar NodeJS, RESTful API server started on: ' + port);