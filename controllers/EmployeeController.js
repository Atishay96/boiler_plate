const __ = require('../helper/Response');
// const moment = require('moment');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');
// const util = require('util');
const Validator = require('../helper/Validator');

require('dotenv').config();

class EmployeeClass {
    constructor() {
        
    }
    async login(req, res) {
        try {
            
        } catch (err) {
            __.errorInternal(err, res);
        }
    }
}

EmployeeClass = new EmployeeClass();
module.exports = EmployeeClass;