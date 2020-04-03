'use strict';

const response = require('./res');
const connection = require('./conn');
const jwt = require('jsonwebtoken')

exports.users = function(req, res) {
let base_url = `SELECT person.id, person.first_name, person.last_name, alamat.asal_kota FROM person LEFT JOIN alamat ON person.id = alamat.id_user`
	
	const {search} = req.query
if(search && search.length>0){
	base_url += ` WHERE first_name LIKE '%${search}%' OR last_name LIKE '%${search}%'`
}
console.log(base_url)

connection.query(base_url, function (error, rows, fields){
		if(error){
			console.log(error)
		} else {
			response.ok(rows, res)
		}
	});
};

exports.index = function (req, res) {
	response.ok("Hallo from the Node JS RESTful side!", res)
};


exports.findUsers = function(req, res) {
	
	let user_id = req.params.user_id;

	connection.query('SELECT * FROM person WHERE id = ?',
		[ user_id ],
		function (error, rows, fields){
			if(error){
				console.log(error)
			} else {
				response.ok(rows, res)
			}
		});
};

exports.searchUsers = function(req, res) {

	const {search} = req.query;
	console.log(search)

	connection.query(`SELECT * FROM person WHERE first_name LIKE '%${search}%' OR last_name LIKE '%${search}%'`,
		// [ first_name, last_name ],
		function (error, rows, fields){
			if (error){
				console.log(error)
			} else {
				response.ok(rows, res)
			}
		}); 

};

exports.createUsers = function(req, res) {
	const first_name = req.body.first_name;
	const last_name = req.body.last_name;

	connection.query('INSERT INTO person (first_name, last_name) values (?,?)',
	[ first_name, last_name ],
	function (error, rows, fields){
		if (error){
			console.log(error)
		} else {
			response.ok("Berhasil menambahkan users!", res)
		}
	});
};

exports.updateUsers = function(req, res) {
    let user_id = req.params.user_id;
    let user_data
    
    connection.query('SELECT * FROM person where id = ?',
    [ user_id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else {
            user_data= rows[0]
        }
    });

    var first_name = req.body.first_name || user_data.first_name;
    var last_name = req.body.last_name || user_data.last_name;
    
    connection.query('UPDATE person SET first_name = ?, last_name = ? WHERE id = ?',
    [ first_name, last_name, user_id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else {
            response.ok("Berhasil merubah user!", res)
        }
    });
};


exports.deleteUsers = function (req, res) {

	const user_id = req.params.user_id;

	connection.query('DELETE FROM person WHERE id = ?', [ user_id ], function
(error, rows, fields){ if(error){ console.log(error) } else {
response.ok("Berhasil menghapus users!", res) } }); };


exports.login = function (req, res) {
	// let {login} = req.body.username || req.body.password;
	// console.log(login)
	
	const username = req.body.username
	const password = req.body.password 

	connection.query(`SELECT * FROM person WHERE username = ? AND password = ?`, [ username, password ],
	function (error, users){
	if (error){ console.log(error)
	} else {
	var token = jwt.sign({ id: users[0].id, username: users[0].username }, "SECRET_KEY", {
		expiresIn: 86400
	} )
	console.log(token)
	response.ok(token, res)	} }); };


exports.register = function (req, res) {
	const first_name = req.body.first_name;
	const last_name = req.body.last_name;
	const username = req.body.username;
	const password = req.body.password;
	

	connection.query('INSERT INTO person (first_name, last_name, username, password) VALUES (?,?,?,?)',
	[ first_name, last_name, username, password ],
	function
	(error, rows, fields){
		if(error){console.log(error)
		} else {
			response.ok("Berhasil register", res)
		}
	});
};

exports.verify = function(req, res) {
	var token = req.headers['x-access-token'];
	if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
	
	jwt.verify(token, 'SECRET_KEY', function(err, decoded) {
	  if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
	  
	  res.status(200).send(decoded); }); };
  