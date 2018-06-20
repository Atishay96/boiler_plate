const express = require('express');
const app = express.Router();
const WebController = require('../controllers/Web/WebRenderer');

//get the index page
app.get('/index', (req, res) => {
    WebController.index(req, res);
})

module.exports = app;