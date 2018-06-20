const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cluster = require('cluster');
const mongoSanitize = require('express-mongo-sanitize');
const EmployeeRoutes = require('./routes/EmployeeRoutes');
const WebRoutes = require('./routes/WebRoutes');
const helmet = require('helmet');
const mongoose = require('mongoose');
// const mongoose = require('mongoose').set('debug', true);
// const passport = require('passport')
require('dotenv').config();

mongoose.Promise = global.Promise;
switch (process.env.mode) {
    case 'development':
        process.env.database = process.env.DevDatabase;
        process.env.port = process.env.Devport;
        process.env.baseURL = process.env.DevBaseURL;
        break;
    case 'test':
        process.env.database = process.env.TestDatabase;
        process.env.port = process.env.Testport;
        process.env.baseURL = process.env.TestBaseURL;
        break;
    default:
        process.env.mode = 'production';
        process.env.database = process.env.ProdDatabase;
        process.env.port = process.env.Prodport;
        process.env.baseURL = process.env.ProdBaseURL;
}
mongoose.connect(process.env.database).catch((err) => {
    if (err) {
        console.error(err);
    }
})
if (cluster.isMaster) {
    if (process.env.mode != 'production') {
        console.log("MODE => " + process.env.mode);
        console.log("PORT => " + process.env.port);
        console.log("Database => " + process.env.database);
    }
    let numWorkers = require('os').cpus().length;

    console.log('Master cluster setting up ' + numWorkers + ' workers...');

    for (let i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', (worker) => {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', (worker, code, signal) => {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
} else {
    const app = express();
    // const http = require('http').Server(app);
    // const io = require('socket.io')(http);
    // io.on('connection', (socket)=>{
    //     console.log('connected')
    //     socket.emit('data', 'connected to worker: ' + cluster.worker.id);
    // });
    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    // requiring passport.js
    // require('./config/passport-jwt');

    app.use(logger('dev'));
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, 'public')));
    // app.use(passport.initialize());
    // To stop mongodb injection 
    app.use(mongoSanitize());

    //routes files
    app.use('/api/employee', EmployeeRoutes);
    app.use('/website', WebRoutes);

    // catch 404
    app.use((req, res, next) => {
        return res.status(404).send({ message: "Wrong URL" });
    });
    const server = app.listen(process.env.port, () => {
        console.log('Process ' + process.pid + ' is listening to all incoming requests');
    });
}