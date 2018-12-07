var users =
    require('../../app/controllers/users.server.controller'),
    passport = require('passport');

module.exports = function (app) {
    app.route('/users')
        .post(users.create)
        .get(users.list);

    app.route('/users/:username')
        .get(users.read)
        .put(users.update)
        .delete(users.delete);

    app.route('/users/:userId/courses')
        .get(users.studentCoursesTaken);
     
    app.param('userId', users.userByID);
    
    app.route('/signup')
        .get(users.renderSignup)
        .post(users.signup);

    app.route('/signin')
        .get(users.renderSignin)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/signin',
            failureFlash: true
        }));
    app.route('/courseList')
        .put(users.studentAddCourse)
        .get(users.courselist)
        .delete(users.studentDeleteCourse);

    app.get('/signout', users.signout);


};