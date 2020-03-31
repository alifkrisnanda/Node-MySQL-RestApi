'use strict';

const response = require('./res');
const connection = require('./conn');

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
