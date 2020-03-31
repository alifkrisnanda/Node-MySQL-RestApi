'use strict';

module.exports = function(app) {
    const todoList = require('./controller');

    app.route('/')
        .get(todoList.index);

    app.route('/users')
        .get(todoList.users);

    // app.route('/alamat')
    //     .get(todoList.alamat);

    app.route('/users/:user_id')
        .get(todoList.findUsers);

    app.route('/users/search/:search')
        .get(todoList.searchUsers)

    app.route('/users/')
        .post(todoList.createUsers);

    app.route('/users/:user_id')
        .put(todoList.updateUsers);
    
    app.route('/users/:user_id')
        .delete(todoList.deleteUsers);
};