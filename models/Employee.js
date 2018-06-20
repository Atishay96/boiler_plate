const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const Employees = mongoose.Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    lastLoggedIn: {
        type: Date
    },
    email: {
        type: String,
        default: '',
        unique: true
    },
    DOB: {
        type: Date
    },
    userName: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    dateOfJoining: {
        type: Date
    },
    roleName: {
        type: String,
        default: ''
    },
    active: {
        type: Boolean,
        default: true
    },
    profilePicture: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

Employees.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//method to decrypt password
Employees.methods.verifyPassword = function (password) {
    let user = this;
    return bcrypt.compareSync(password, user.password);
};

const EmployeesModel = mongoose.model('Employees', Employees);

module.exports = EmployeesModel;