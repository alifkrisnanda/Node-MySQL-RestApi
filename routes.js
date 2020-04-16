'use strict';

module.exports = function(app) {
    const todoList = require('./controller');

    app.route('/')
        .get(todoList.index);

    app.route('/users')
        .get(todoList.users);

    app.route('/users/asc')
        .put(todoList.asc)

    // app.route('/users/usia')
    //     .get(todoList.batasatas);

    app.route('/users/login')
        .get(todoList.login);

    app.route('/users/register')
        .post(todoList.register);

    app.route('/users/verify')
        .get(todoList.verify);

    app.route('/users/total')
        .get(todoList.total);

    app.route('users/avg')
        .get(todoList.rata)

    // app.route('/users/total')
    //     .get(todoList.batasAtas);

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