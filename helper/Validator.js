const __ = require('./Response');
class Validator {
    notEmpty(req, res, next, arrayOfStrings) {
        req.error = '';
        arrayOfStrings.map((v, i) => {
            if (req.body[v] === null || req.body[v] == '') {
                req.error = "Bad Values";
            }
        })
        if (req.error) {
            __.badValues(res);
        } else {
            next();
        }
    }
    notEmptyInside(req, res, arrayOfStrings) {
        req.error = '';
        arrayOfStrings.map((v, i) => {
            if (req.body[v] == null || req.body[v] == '') {
                req.error = "Bad Values";
            }
        })
        if (req.error) {
            __.badValues(res);
            return false;
        } else {
            return true;
        }
    }
}

Validator = new Validator();
module.exports = Validator;