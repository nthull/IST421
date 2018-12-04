var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    username: {
        type: String,
    },
    password: {
        type: String,
        validate: [
            function (password) {
                return password.length >= 6;
            },
            'Password should be longer'
        ]
    },
    coursesTaken: {
        type: String
    },
    salt: {
        type: String
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    providerID: String,
    providerData: {},
    created: {
        type: Date,
        default: Date.now
    },
    
    
},
    { collection: 'psuStudents' });


var CourseSchema = new Schema({
    courseID: String,
    courseName: String,
    courseNumber: String,
    startTime: String,
    finishTime: String,
    startDate: Date,
    finishDate: Date,
    courseLecturer: String,
    creditAmount: Number,
    courseDescription: String,
    courseLocation: String,
    classDays: [{ type: String }]
},
    { collection: 'psuCourses' });

UserSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
}).set(function (fullName) {
    var splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});

UserSchema.pre('save', function (next) {
    if (this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

UserSchema.methods.hashPassword = function (password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha1').toString('base64');
};

UserSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
};

UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

mongoose.model('User', UserSchema);
mongoose.model('Course', CourseSchema);
