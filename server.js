const express = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	bodyParser = require('body-parser'),
	controller = require('./controller');

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