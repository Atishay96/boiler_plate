const express = require('express');
const app = express.Router();
const Validator = require('../helper/Validator');
const EmployeeController = require('../controllers/EmployeeController');
// const PermissionController = require('../controllers/PermissionController');
const Auth = require('../config/Authentication');;

// to log the user in(generating token)
app.post('/login', (req, res, next) => { Validator.notEmpty(req, res, next, ['userName', 'password']) }, (req, res) => {
    EmployeeController.login(req, res);
})

//get all employees
app.get('/Employees', Auth.authMiddleware, (req, res, next) => {
    EmployeeController.getAllEmployees(req, res);
})

//add an Employee
app.post('/addEmployee', Auth.authMiddleware, (req, res, next) => {
    EmployeeController.addEmployee(req, res);
})

//edit Employee Details
app.post('/editEmployee', Auth.authMiddleware, (req, res, next) => {
    EmployeeController.addEmployee(req, res);
})

//update employee rights
app.put('/updateEmployeeRights', (req, res, next) => { Validator.notEmpty(req, res, next, ['_id']) }, (req, res) => {
    EmployeeController.updateEmployeeRights(req, res);
})

//delete employee
app.delete('/Employee', (req, res, next) => { Validator.notEmpty(req, res, next, ['_id']) }, (req, res) => {
    EmployeeController.deleteEmployee(req, res);
})

module.exports = app;