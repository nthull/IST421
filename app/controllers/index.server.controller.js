var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://localhost:27017/";

exports.render = function (req, res) {
    if (req.session.lastVisit) {
        console.log(req.session.lastVisit);
    }

    req.session.lastVisit = new Date();

    res.render('index', {
        title: 'Hello World',
        userFullName: req.user ? req.user.fullName : ''
    });
};

/*MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("psuDB");
    var url = MongoClient.connect{ useNewUrlParser: true };
    dbo.collection("psuCourses").findOne({}, function (err, result) {
        if (err) throw err;
        console.log(result.name);
        db.close();
    });
});
*/