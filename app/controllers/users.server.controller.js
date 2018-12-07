var User = require('mongoose').model('User'),
    Course = require('mongoose').model('Course'),
    passport = require('passport');

var getErrorMessage = function (err) {
    var message = '';

    if (err.code) {
        switch (err.code) {
                case 11000:
                case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }

    return message;
};

exports.renderSignin = function (req, res, next) {
    if (!req.user) {
        res.render('signin', {
            title: 'Sign-in Form',
            messages: req.flash('error') || req.flash('info')
        });
    } else {
        return res.redirect('/');
    }
};

exports.renderSignup = function (req, res, next) {
    if (!req.user) {
        res.render('signup', {
            title: 'Sign-up Form',
            messages: req.flash('error')
        });
    } else {
        return res.redirect('/');
    }
};

exports.signup = function (req, res, next) {
    if (!req.user) {
        var user = new User(req.body);
        var message = null;

        user.provider = 'local';

        user.save(function (err) {
            if (err) {
                var message = getErrorMessage(err);

                req.flash('error', message);
                return res.redirect('/signup');
            }
            req.login(user, function (err) {
                if (err) return next(err);
                return res.redirect('/');
            });
        });
    } else {
        return res.redirect('/');
    }
};

exports.signout = function (req, res) {
    req.logout();
    res.redirect('/');
};

exports.create = function (req, res, next) {
    var user = new User(req.body);
    user.save(function (err) {
        if (err) {
            return next(err);
        } else {
            res.json(user);
        }
    });
};

exports.list = function (req, res, next) {
    User.find({}, function (err, users) {
        if (err) {
            return next(err);
        } else {
            res.json(users);
        }
    });
};

exports.studentCoursesTaken = function (req, res, next) {
    //Need to make this findOne, where the find is psuID and then courses are displayed
    User.find({ username: req.user.username }, function (err, user) {
        if (err) {
            return next(err);
        } else {
            res.json(req.user.coursesTaken);
        }
    })
};

exports.studentAddCourse = function (req, res, next) {
    var addCourse = req.body;

    if (!req.body) {
        return res.send(400);
    }
    User.findByIdAndUpdate({ psuID: req.user.psuID }, addCourse, function (err, user) {
        if (err) {
            res.send(err);
        } else {
            res.json(user);
        }
    })
};

exports.studentDeleteCourse = function (req, res, next) {
    var deleteCourse = req.body;

    if (!req.body) {
        return res.send(400);
    }
    User.findByIdAndUpdate({ psuID: req.user.psuID.coursesTaken }, deleteCourse, function (err, user) {
        if (err) {
            res.send(err);
        } else {
            res.json(user);
        }
    })
};

exports.read = function (req, res, next) {
    User.findOne({
        username: req.params.username
    }, function (err, user) {
        if (err) {
            return next(err);
        } else {
            res.json(user);
        }
    })
};
exports.userByID = function (req, res, next, username) {
    User.findOne({
        username: req.params.username
    }, function (err, user) {
        if (err) {
            return next(err);
        } else {
            req.user = user;
            next();
        }
    });
};

exports.update = function (req, res, next) {
    var data = req.body;
    User.findOneAndUpdate({
        username: req.user.username
    }, {
        $push: {
            coursesTaken: { data } }
        }, function(err, user) {
        
        if (err) {
            return next(err);
        } else {
            res.json(user);
        }
    });
};

exports.delete = function (req, res, next) {
    req.user.remove(function (err) {
        if (err) {
            return next(err);
        } else {
            res.json(req.user);
        }
    })
};

exports.courselist = function (req, res, next) {
    Course.find({}, function (err, courses) {
        if (err) {
            return next(err);
        } else {
            res.json(courses);
        }
    });
};