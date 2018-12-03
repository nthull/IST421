var users =
    require('../../app/controllers/users.server.controller'),
    passport = require('passport');

module.exports = function (app) {
    app.route('/users')
        .post(users.create)
        .get(users.list);


    app.route('/users/:userId')
        .get(users.read)
        .put(users.update)
        .delete(users.delete);
    app.param('userId', users.userByID);

    app.route('/users/:userId/courses')
        .get(users.studentCoursesTaken)
        .post(users.addClass)
        .delete(users.courseScheduleDelete);
    app.param('userId', users.userByID);
    
    app.route('/signup')
        .get(users.renderSignup)
        .post(users.signup);
    app.route('/users/:userId/addCourse')
    app.route('/signin')
        .get(users.renderSignin)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/signin',
            failureFlash: true
        }));
    app.route('/courseList')
        .get(users.courselist)
    app.get('/signout', users.signout);


};