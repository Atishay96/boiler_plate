const Employee = require('../models/Employee');
const __ = require('../helper/Response');
const jwt = require('jsonwebtoken');

require('dotenv').config();

class Auth{
    async authMiddleware(req, res, next){
        try{
            if(!req.headers.authtoken){
                return __.signout(res);
            }
            let payLoad = jwt.verify(req.headers.authtoken, process.env.randomKey);
            console.log(payLoad);
            let emp = await Employee.findOne({_id: payLoad._id, lastLoggedIn: payLoad.lastLoggedIn});
            if(!emp){
                return __.signout(res);
            }
            req.user = emp;
            next();
        }catch(err){
            __.errorInternal(err, res);
        }
    }
}

Auth = new Auth();
module.exports = Auth;